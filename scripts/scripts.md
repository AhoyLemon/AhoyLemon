# Scripts Overview

## scripts/github-stats.js
Collects GitHub user statistics using the GitHub API and writes them to `data/github.yml`. Stats include repo, commit, PR, issue, language, and follower counts, among others.

## scripts/update-badges.js
Reads `data/github.yml` and updates the badges section in `README.md` with up-to-date stat badges, each on its own line, using Shields.io. 
The badges are inserted between the `<!-- GITHUB-BADGES:START -->` and `<!-- GITHUB-BADGES:END -->` comments in the README.
