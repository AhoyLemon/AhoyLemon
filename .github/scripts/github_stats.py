import os
import yaml
from github import Github

USERNAME = os.environ.get("GITHUB_USERNAME")
TOKEN = os.environ.get("GITHUB_TOKEN")

g = Github(TOKEN)
user = g.get_user(USERNAME)

# Gather stats
data = {
    'login': user.login,
    'name': user.name,
    'public_repos': user.public_repos,
    'public_gists': user.public_gists,
    'followers': user.followers,
    'following': user.following,
    'created_at': str(user.created_at),
    'total_stars': 0,
    'total_forks': 0,
    'total_commits': 0,
    'most_starred_repo': None,
    'most_forked_repo': None,
    'most_used_languages': {},
}

repos = list(user.get_repos())

# For stars, forks, commits, languages
for repo in repos:
    if repo.fork:
        continue
    data['total_stars'] += repo.stargazers_count
    data['total_forks'] += repo.forks_count
    if not data['most_starred_repo'] or repo.stargazers_count > data['most_starred_repo']['stars']:
        data['most_starred_repo'] = {'name': repo.name, 'stars': repo.stargazers_count}
    if not data['most_forked_repo'] or repo.forks_count > data['most_forked_repo']['forks']:
        data['most_forked_repo'] = {'name': repo.name, 'forks': repo.forks_count}
    # Language count
    lang = repo.language
    if lang:
        data['most_used_languages'][lang] = data['most_used_languages'].get(lang, 0) + 1
    # Commits (only for public repos, and only if not archived)
    if not repo.archived:
        try:
            data['total_commits'] += repo.get_commits(author=user).totalCount
        except Exception:
            pass  # Some repos may not allow this

# Sort languages by usage
if data['most_used_languages']:
    data['most_used_languages'] = dict(sorted(data['most_used_languages'].items(), key=lambda x: x[1], reverse=True))

# Write to YAML
os.makedirs('data', exist_ok=True)
with open('data/github.yml', 'w') as f:
    yaml.dump(data, f, default_flow_style=False)
