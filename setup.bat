@echo off
echo STARTING SETUP > setup_debug.log
mkdir gf-site
cd gf-site
echo RUNNING NPM CREATE > setup_debug.log
call npm create vite@latest . -- --template react >> setup_debug.log 2>&1
echo NPM INSTALLING >> setup_debug.log
call npm install >> setup_debug.log 2>&1
echo DONE >> setup_debug.log
