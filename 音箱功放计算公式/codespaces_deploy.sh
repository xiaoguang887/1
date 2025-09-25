#!/bin/bash

# GitHub Codespaces 部署脚本
# 此脚本帮助在GitHub Codespaces环境中同步代码并生成静态链接

echo "===== GitHub Codespaces 音箱功放计算器部署脚本 ====="

echo "1. 检查当前目录结构"
ls -la

echo -e "\n2. 初始化Git仓库（如果尚未初始化）"
if [ -d ".git" ]; then
  echo "Git仓库已存在，跳过初始化"
else
  git init
  echo "Git仓库初始化完成"
fi

echo -e "\n3. 创建.gitignore文件（如果不存在）"
if [ ! -f ".gitignore" ]; then
  echo "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?" > .gitignore
  echo ".gitignore文件创建完成"
else
  echo ".gitignore文件已存在，跳过创建"
fi

echo -e "\n4. 添加所有文件到Git"
git add .

echo -e "\n5. 配置Git用户信息（请手动输入）"
read -p "请输入您的GitHub用户名: " git_user
read -p "请输入您的GitHub邮箱: " git_email
git config user.name "$git_user"
git config user.email "$git_email"

echo -e "\n6. 提交更改"
read -p "请输入提交信息: " commit_msg
git commit -m "$commit_msg"

echo -e "\n7. 推送到GitHub Codespaces仓库"
# 检查是否已有远程仓库配置
remote_url=$(git remote get-url origin 2>/dev/null)
if [ -z "$remote_url" ]; then
  echo "尚未配置远程仓库，正在添加..."
  # GitHub Codespaces仓库URL通常为 https://github.com/用户名/仓库名.git
  read -p "请输入GitHub仓库URL: " repo_url
  git remote add origin "$repo_url"
  git push -u origin master
else
  echo "正在推送到现有远程仓库: $remote_url"
  git push origin master
fi

echo -e "\n8. 启用GitHub Pages部署检查"
echo "请按照以下步骤在GitHub上启用Pages功能:"
echo "1) 打开GitHub仓库页面"
echo "2) 点击Settings > Pages"
echo "3) 在Source选项中选择分支(master或main)和目录(/root)"
echo "4) 点击Save"
echo "5) 几分钟后，网站将在 $https://$git_user.github.io/[仓库名]/ 可用"

echo -e "\n9. 本地预览服务启动"
echo "启动简单的HTTP服务器以在Codespaces中预览网站..."
echo "请在新终端中运行: python -m http.server 8000"
echo "然后点击Codespaces中的端口转发按钮，打开预览窗口"

echo -e "\n===== 部署脚本执行完成 ====="

echo "\n注意事项:"
echo "1. GitHub Pages可能需要几分钟来构建您的网站"
echo "2. 如果您使用的是提供的URL: https://ubiquitous-trout-r454p7x7gjw9h5gjj.github.dev/"
echo "   这可能是一个临时的Codespaces URL，通常需要在GitHub Pages中设置永久域名"
echo "3. 后续更新代码只需重复步骤4-6和7即可"