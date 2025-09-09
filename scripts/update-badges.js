
// scripts/update-badges.js
// Reads data/github.yml and updates the badges section in README.md
import fs from "fs";
import yaml from "js-yaml";

const GITHUB_YML = "data/github.yml";
const README = "README.md";

function formatBadge(label, value, color = "e4e72c", logo = "github") {
  return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(
    value
  )}-${color}?style=for-the-badge&logo=${logo})`;
}

function buildBadges(stats) {
  const badges = [];
  // Only show the badges requested by the user, in this exact order, each on its own line:
  // public_repos, commits (if available), total_watchers, followers, following, total_commits, total_issues, total_closed_issues, total_prs, total_closed_prs, total_watchers (again), total_gists
  badges.push(formatBadge("Public Repos", stats.public_repos));
  if (typeof stats.commits !== 'undefined') badges.push(formatBadge("Commits", stats.commits, "fbca04", "git"));
  badges.push(formatBadge("Total Watchers", stats.total_watchers, "6e5494", "eye"));
  badges.push(formatBadge("Followers", stats.followers, "1da1f2", "github"));
  badges.push(formatBadge("Following", stats.following, "1da1f2", "github"));
  badges.push(formatBadge("Total Commits", stats.total_commits, "fbca04", "git"));
  badges.push(formatBadge("Total Issues", stats.total_issues, "d73a4a", "issue-opened"));
  badges.push(formatBadge("Closed Issues", stats.total_closed_issues, "6e5494", "issue-closed"));
  badges.push(formatBadge("Total PRs", stats.total_prs, "0075ca", "git-pull-request"));
  badges.push(formatBadge("Closed PRs", stats.total_closed_prs, "6e5494", "git-pull-request"));
  badges.push(formatBadge("Total Watchers", stats.total_watchers, "6e5494", "eye"));
  badges.push(formatBadge("Total Gists", stats.total_gists, "6e5494", "gist"));
  return badges.join("\n");
}

function updateReadme(badges) {
  const readmePath = README;
  let content = fs.readFileSync(readmePath, "utf-8");
  const start = "<!-- GITHUB-BADGES:START -->";
  const end = "<!-- GITHUB-BADGES:END -->";
  const badgeBlock = `${start}\n${badges}\n${end}`;
  // Always replace the section, even if whitespace/line endings differ
  const sectionRegex = new RegExp(`${start}[\r\n]*[\s\S]*?[\r\n]*${end}`);
  if (sectionRegex.test(content)) {
    content = content.replace(sectionRegex, badgeBlock);
  } else {
    // Insert after GitHub Stats section if possible
    content = content.replace(
      /(## GitHub Stats[\s\S]*?)(\n{2,})/i,
      `$1\n\n${badgeBlock}\n\n`
    );
  }
  fs.writeFileSync(readmePath, content);
  console.log("README.md badges section updated.");
}

function main() {
  const stats = yaml.load(fs.readFileSync(GITHUB_YML, "utf-8"));
  const badges = buildBadges(stats);
  console.log("Generated badges markdown:\n", badges);
  updateReadme(badges);
}

main();
