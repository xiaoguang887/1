@echo off

REM 音箱功放计算器部署脚本
REM 此脚本帮助Windows用户快速部署和更新网站

echo 音箱功放计算器部署脚本

echo 请确保您已安装Git并配置了GitHub/Netlify/Vercel账号

echo 1. 初始化Git仓库（如果尚未初始化）
echo 2. 提交更改
echo 3. 推送到远程仓库

set /p choice="请选择操作 (1/2/3) 或按Enter退出: "

if "%choice%" == "1" goto init
if "%choice%" == "2" goto commit
if "%choice%" == "3" goto push

echo 退出脚本
pause
exit

:init
echo 初始化Git仓库...
git init
git add .
git commit -m "Initial commit"
echo Git仓库已初始化
pause
goto end

:commit
echo 提交更改...
git add .
set /p commit_message="请输入提交信息: "
git commit -m "%commit_message%"
echo 更改已提交
pause
goto end

:push
echo 推送到远程仓库...
set /p remote_url="请输入远程仓库URL: "
git push -u %remote_url% master
echo 更改已推送到远程仓库
pause
goto end

:end
echo 操作完成
pause