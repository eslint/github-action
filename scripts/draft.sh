#!/bin/bash

# Configure git info
git config user.name "Draft Publisher"
git config user.email "drafts@users.noreply.github.com"
target_repo="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git remote add publisher "${target_repo}"

# Create a new branch
git checkout -b draft
rm -rf node_modules
sed -i '/node_modules/d' .gitignore # Bash command that removes node_modules from .gitignore
npm install --production
git add node_modules .gitignore
git commit -m "Chore: Automated draft branch creation"
git push publisher draft -f
