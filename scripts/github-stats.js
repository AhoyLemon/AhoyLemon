
import { Octokit } from "@octokit/rest";
import fs from "fs";
import yaml from "js-yaml";
import cliProgress from "cli-progress";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "ahoylemon";

if (!GITHUB_TOKEN) {
  console.error("Please set the GITHUB_TOKEN environment variable.");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });



async function getStats() {
  console.log("Fetching user info...");
  const { data: user } = await octokit.users.getByUsername({ username: GITHUB_USERNAME });

  // Get authenticated user info (for private repo/gist counts)
  let privateRepos = null, privateGists = null;
  try {
    console.log("Fetching authenticated user info (for private repo/gist counts)...");
    const { data: authUser } = await octokit.users.getAuthenticated();
    privateRepos = authUser.total_private_repos;
    privateGists = authUser.private_gists;
  } catch (e) {}

  // Get all repos (public + private, if token allows)
  let repos = [];
  let page = 1;
  console.log("Fetching repositories...");
  while (true) {
    const { data } = await octokit.repos.listForUser({ username: GITHUB_USERNAME, per_page: 100, page });
    repos = repos.concat(data);
    if (data.length < 100) break;
    page++;
  }

  // Get organizations
  let orgs = [];
  try {
    console.log("Fetching organizations...");
    const { data } = await octokit.orgs.listForUser({ username: GITHUB_USERNAME });
    orgs = data.map(o => o.login);
  } catch (e) {}

  // Get pinned repos (via user profile, not API, so skip for now)
  // Get all topics/tags used across repos
  let topics = new Set();
  // Aggregate stats
  let totalStars = 0, totalForks = 0, totalCommits = 0;
  let totalIssues = 0, totalPRs = 0, totalClosedIssues = 0, totalClosedPRs = 0;
  let totalOpenIssues = 0, totalOpenPRs = 0;
  let totalReleases = 0, totalWatchers = 0, totalSubscribers = 0;
  let archivedCount = 0, ciCdCount = 0;
  let languages = {}, languageBytes = {}, uniqueLanguages = new Set();
  let mostStarredRepo = null, mostForkedRepo = null, mostIssuesRepo = null, mostPRsRepo = null;
  let mostRecentlyUpdatedRepo = null, mostRecentlyCreatedRepo = null;

  // Progress bar for repo processing
  const bar = new cliProgress.SingleBar({
    format: 'Processing repos |{bar}| {percentage}% | {value}/{total} | {repo}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });
  const userRepos = repos.filter(r => !r.fork);
  bar.start(userRepos.length, 0, { repo: '' });

  for (const [i, repo] of userRepos.entries()) {
    bar.update(i, { repo: repo.name });
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    totalWatchers += repo.watchers_count;
    totalSubscribers += repo.subscribers_count || 0;
    if (repo.archived) archivedCount++;
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
      uniqueLanguages.add(repo.language);
    }
    // Get language breakdown by bytes
    try {
      const { data: langData } = await octokit.repos.listLanguages({ owner: GITHUB_USERNAME, repo: repo.name });
      for (const [lang, bytes] of Object.entries(langData)) {
        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
        uniqueLanguages.add(lang);
      }
    } catch (e) {}
    // Get topics
    try {
      const { data: repoTopics } = await octokit.repos.getAllTopics({ owner: GITHUB_USERNAME, repo: repo.name });
      repoTopics.names.forEach(t => topics.add(t));
    } catch (e) {}
    // Get releases
    try {
      const { data: releases } = await octokit.repos.listReleases({ owner: GITHUB_USERNAME, repo: repo.name, per_page: 1 });
      totalReleases += releases.length;
    } catch (e) {}
    // Get CI/CD (workflows)
    try {
      const { data: workflows } = await octokit.actions.listRepoWorkflows({ owner: GITHUB_USERNAME, repo: repo.name });
      if (workflows.total_count > 0) ciCdCount++;
    } catch (e) {}
    // Get issues/PRs
    totalOpenIssues += repo.open_issues_count;
    // Most starred/forked/issues/PRs
    if (!mostStarredRepo || repo.stargazers_count > mostStarredRepo.stars) {
      mostStarredRepo = { name: repo.name, stars: repo.stargazers_count };
    }
    if (!mostForkedRepo || repo.forks_count > mostForkedRepo.forks) {
      mostForkedRepo = { name: repo.name, forks: repo.forks_count };
    }
    if (!mostRecentlyUpdatedRepo || new Date(repo.updated_at) > new Date(mostRecentlyUpdatedRepo.updated_at)) {
      mostRecentlyUpdatedRepo = repo;
    }
    if (!mostRecentlyCreatedRepo || new Date(repo.created_at) > new Date(mostRecentlyCreatedRepo.created_at)) {
      mostRecentlyCreatedRepo = repo;
    }
    // Most issues/PRs
    if (!mostIssuesRepo || repo.open_issues_count > mostIssuesRepo.issues) {
      mostIssuesRepo = { name: repo.name, issues: repo.open_issues_count };
    }
    // PRs: count open/closed PRs (first page only for speed)
    try {
      const { data: prs } = await octokit.pulls.list({ owner: GITHUB_USERNAME, repo: repo.name, state: "all", per_page: 100 });
      totalPRs += prs.length;
      totalOpenPRs += prs.filter(pr => pr.state === "open").length;
      totalClosedPRs += prs.filter(pr => pr.state === "closed").length;
      if (!mostPRsRepo || prs.length > mostPRsRepo.prs) {
        mostPRsRepo = { name: repo.name, prs: prs.length };
      }
    } catch (e) {}
    // Issues: count closed issues (first page only for speed)
    try {
      const { data: issues } = await octokit.issues.listForRepo({ owner: GITHUB_USERNAME, repo: repo.name, state: "closed", per_page: 100 });
      totalClosedIssues += issues.length;
      totalIssues += issues.length;
    } catch (e) {}
    // Commits: count only first page for speed
    try {
      const { data: commits } = await octokit.repos.listCommits({ owner: GITHUB_USERNAME, repo: repo.name, author: GITHUB_USERNAME, per_page: 100 });
      totalCommits += commits.length;
    } catch (e) {}
  }
  bar.update(userRepos.length, { repo: 'Done' });
  bar.stop();

  // Sort languages by usage
  const sortedLanguages = Object.fromEntries(
    Object.entries(languages).sort((a, b) => b[1] - a[1])
  );
  const sortedLanguageBytes = Object.fromEntries(
    Object.entries(languageBytes).sort((a, b) => b[1] - a[1])
  );

  const stats = {
    login: user.login,
    name: user.name,
    public_repos: user.public_repos,
    private_repos: privateRepos,
    public_gists: user.public_gists,
    private_gists: privateGists,
    total_gists: (user.public_gists || 0) + (privateGists || 0),
    followers: user.followers,
    following: user.following,
    created_at: user.created_at,
    organizations: orgs,
    total_stars: totalStars,
    total_forks: totalForks,
    total_commits: totalCommits,
    total_issues: totalIssues,
    total_prs: totalPRs,
    total_closed_issues: totalClosedIssues,
    total_closed_prs: totalClosedPRs,
    total_open_issues: totalOpenIssues,
    total_open_prs: totalOpenPRs,
    total_releases: totalReleases,
    total_watchers: totalWatchers,
    total_subscribers: totalSubscribers,
    most_starred_repo: mostStarredRepo,
    most_forked_repo: mostForkedRepo,
    most_issues_repo: mostIssuesRepo,
    most_prs_repo: mostPRsRepo,
    most_recently_updated_repo: mostRecentlyUpdatedRepo ? { name: mostRecentlyUpdatedRepo.name, updated_at: mostRecentlyUpdatedRepo.updated_at } : null,
    most_recently_created_repo: mostRecentlyCreatedRepo ? { name: mostRecentlyCreatedRepo.name, created_at: mostRecentlyCreatedRepo.created_at } : null,
    most_used_languages: sortedLanguages,
    language_breakdown_bytes: sortedLanguageBytes,
    unique_languages: Array.from(uniqueLanguages),
    archived_repos: archivedCount,
    repos_with_cicd: ciCdCount,
    topics: Array.from(topics),
  };

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/github.yml", yaml.dump(stats));
  console.log("GitHub stats written to data/github.yml");
}

getStats();
