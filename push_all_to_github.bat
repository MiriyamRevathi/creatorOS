@echo off
title CreatorOS - Automated 35 Commits, PR Merges and GitHub Push
color 0b

echo ==================================================================
echo [CreatorOS] AUTOMATING 35 COMMITS, BRANCHES, PR MERGES AND PUSH
echo ==================================================================
echo.

cd /d "%~dp0"
python automate_git_commits.py

echo.
echo ==================================================================
echo [CreatorOS] PROCESS COMPLETE! 
echo All 35 commits and PR merges have been generated and pushed.
echo ==================================================================
pause
