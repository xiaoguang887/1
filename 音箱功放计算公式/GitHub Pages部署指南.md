# GitHub Pages 部署指南

本指南将帮助您将音箱功放搭配计算器部署到GitHub Pages，这是一个免费的静态网页托管服务，任何人都可以通过网络链接访问您的计算器。

## 前提条件

在开始之前，请确保您已安装以下软件：

- [Git](https://git-scm.com/downloads) - 版本控制系统
- [GitHub账号](https://github.com/join) - 免费注册

## 部署步骤

### 第一步：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 在 "Repository name" 中输入仓库名称，例如：`speaker-amp-calculator`
4. 选择仓库可见性（推荐选择 "Public"，因为GitHub Pages要求公开仓库才能免费使用）
5. 点击 "Create repository" 按钮

### 第二步：准备本地文件

确保您的 `音箱功放计算公式` 文件夹中包含以下文件：

- `index.html` - 计算器主页
- `style.css` - 样式文件
- `script.js` - JavaScript脚本
- `.nojekyll` - 防止GitHub Pages使用Jekyll处理文件
- `README.md` - 项目说明文档

### 第三步：部署到GitHub Pages

您可以通过以下两种方法之一进行部署：

#### 方法一：使用deploy.bat脚本（Windows用户）

1. 双击运行 `deploy.bat` 文件
2. 根据提示输入您的GitHub仓库URL（例如：`https://github.com/您的用户名/speaker-amp-calculator.git`）
3. 脚本会自动完成初始化、提交和推送操作

#### 方法二：手动部署（所有操作系统）

1. 打开命令提示符（Windows）或终端（Mac/Linux）
2. 导航到您的项目文件夹：
   ```bash
   cd c:\Users\28596\Desktop\音箱功放计算公式
   ```
3. 初始化Git仓库：
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

### 第四步：启用GitHub Pages

1. 回到GitHub，打开您刚刚创建的仓库
2. 点击 "Settings" 选项卡
3. 在左侧菜单中选择 "Pages"
4. 在 "Branch" 下拉菜单中，选择 "master" 或 "main" 分支，然后点击 "Save"
5. 等待几分钟，GitHub Pages将会构建您的网站
6. 页面刷新后，您将看到一个绿色提示框，显示您的网站已发布在 `https://您的用户名.github.io/speaker-amp-calculator/`

## 测试您的网站

1. 打开浏览器，访问GitHub Pages提供的URL
2. 测试计算器的所有功能，确保一切正常工作
3. 尝试从不同设备和网络访问，确认所有人都可以使用

## 自定义域名（可选）

如果您有自己的域名，可以设置它来替代GitHub Pages提供的默认域名：

1. 在您的域名注册商处，添加一个CNAME记录，指向 `您的用户名.github.io`
2. 在项目根目录创建一个名为 `CNAME` 的文件（注意没有文件扩展名）
3. 在文件中添加您的域名，例如：`www.yourdomain.com`
4. 提交并推送此更改到GitHub
5. 在GitHub仓库的Pages设置中，输入您的自定义域名，然后点击 "Save"

## 更新您的网站

当您对计算器进行更新后，只需提交并推送更改到GitHub，GitHub Pages会自动重新构建您的网站：

```bash
git add .
git commit -m "Update calculator"
git push origin master
```

## 在GitHub上直接编辑静态网页

您可以直接在GitHub网站上编辑已部署的静态网页文件，无需在本地修改后再推送：

1. 登录您的GitHub账号，进入音箱功放计算器仓库
2. 在仓库主页找到您想要编辑的文件（如 `index.html`、`style.css` 或 `script.js`）
3. 点击文件名打开文件预览
4. 点击右上角的铅笔图标（Edit this file）开始编辑
5. 在编辑界面中，您可以直接修改代码内容
6. 编辑完成后，滚动到页面底部
7. 在"Commit changes"部分输入提交信息（如"Update index.html"）
8. 选择"Commit directly to the master branch"选项
9. 点击"Commit changes"按钮保存修改

修改提交后，GitHub Pages会自动重新构建您的网站，通常需要几分钟时间来更新。

## 常见问题解决

- **网站没有更新**：GitHub Pages可能需要几分钟来构建新的更改，请耐心等待
- **404错误**：确保您的主页面文件名为 `index.html`，并且在正确的分支上
- **样式或脚本不加载**：检查文件路径是否正确，确保没有使用绝对路径
- **访问统计不工作**：CountAPI可能需要一些时间来开始记录，或者网络连接限制了外部脚本加载
- **无法编辑文件**：确保您拥有仓库的编辑权限，并且已经登录GitHub账号

如果您遇到其他问题，请查看GitHub Pages的[官方文档](https://docs.github.com/cn/pages)或在GitHub社区寻求帮助。

## 其他免费托管选项

如果您想尝试其他免费的静态网页托管服务，可以参考 `README.md` 文件中提供的Netlify和Vercel部署指南。这些服务同样提供免费套餐，并且通常具有更强大的功能和更快的加载速度。