# GitHub同步指南

本指南将帮助您将桌面创建的音箱功放计算公式文件夹同步到GitHub，并在GitHub上编辑静态网页。

## 前提条件

在开始之前，请确保您已完成以下准备：

1. 安装[Git](https://git-scm.com/downloads)版本控制系统
2. 拥有[GitHub账号](https://github.com/join)（免费注册）
3. 在GitHub上创建了一个新的仓库（参考GitHub Pages部署指南的第一步）

## 步骤一：将本地文件夹同步到GitHub

### 方法一：使用deploy.bat脚本（Windows用户）

1. 确保您的`音箱功放计算公式`文件夹中包含`deploy.bat`文件
2. 双击运行`deploy.bat`文件
3. 根据提示输入您的GitHub仓库URL（例如：`https://github.com/您的用户名/speaker-amp-calculator.git`）
4. 脚本会自动完成初始化、提交和推送操作

### 方法二：手动同步

1. 按下`Win+R`键，输入`cmd`，打开命令提示符
2. 导航到您的项目文件夹：
   ```bash
   cd c:\Users\28596\Desktop\音箱功放计算公式
   ```
3. 初始化Git仓库（如果尚未初始化）：
   ```bash
   git init
   ```
4. 添加所有文件：
   ```bash
   git add .
   ```
5. 提交更改：
   ```bash
   git commit -m "Initial commit"
   ```
6. 关联GitHub仓库：
   ```bash
   git remote add origin https://github.com/您的用户名/speaker-amp-calculator.git
   ```
7. 推送到GitHub：
   ```bash
   git push -u origin master
   ```

## 步骤二：在GitHub上编辑静态网页

同步完成后，您可以直接在GitHub网站上编辑静态网页文件：

1. 登录您的GitHub账号
2. 进入您刚刚创建的音箱功放计算器仓库
3. 在仓库主页找到您想要编辑的文件（如`index.html`、`style.css`或`script.js`）
4. 点击文件名打开文件预览
5. 点击右上角的铅笔图标（Edit this file）开始编辑
6. 在编辑界面中，您可以直接修改代码内容
7. 编辑完成后，滚动到页面底部
8. 在"Commit changes"部分输入提交信息（如"Update index.html"）
9. 选择"Commit directly to the master branch"选项
10. 点击"Commit changes"按钮保存修改

## 步骤三：启用GitHub Pages（使网页可访问）

1. 回到GitHub，打开您的仓库
2. 点击"Settings"选项卡
3. 在左侧菜单中选择"Pages"
4. 在"Branch"下拉菜单中，选择"master"或"main"分支，然后点击"Save"
5. 等待几分钟，GitHub Pages将会构建您的网站
6. 页面刷新后，您将看到一个绿色提示框，显示您的网站已发布在`https://您的用户名.github.io/speaker-amp-calculator/`

## 步骤四：本地修改后更新到GitHub

当您在本地对计算器进行更新后，可以使用以下步骤将更改同步到GitHub：

1. 打开命令提示符
2. 导航到项目文件夹：
   ```bash
   cd c:\Users\28596\Desktop\音箱功放计算公式
   ```
3. 添加所有修改的文件：
   ```bash
   git add .
   ```
4. 提交更改：
   ```bash
   git commit -m "Update calculator"
   ```
5. 推送到GitHub：
   ```bash
   git push origin master
   ```

修改提交后，GitHub Pages会自动重新构建您的网站，通常需要几分钟时间来更新。

## 常见问题解决

- **无法推送代码**：请确保您已正确安装Git并配置了GitHub账号，并且对仓库有写权限
- **网站没有更新**：GitHub Pages可能需要几分钟来构建新的更改，请耐心等待
- **文件路径错误**：确保在命令行中使用正确的文件夹路径
- **无法编辑文件**：确保您拥有仓库的编辑权限，并且已经登录GitHub账号

如果您遇到其他问题，请查看GitHub的[官方文档](https://docs.github.com/cn)或在GitHub社区寻求帮助。