# Netlify 部署 Next.js 静态网站完整指南

本文档记录了将 Next.js 个人网站部署到 Netlify 的完整流程，包括遇到的问题和解决方案。

**项目信息：**
- 仓库：https://github.com/zjun1543-oss/personal-website
- 部署地址：https://cozy-crumble-01bf77.netlify.app
- 部署日期：2026-02-02

---

## 📋 目录

1. [前置准备](#前置准备)
2. [项目配置](#项目配置)
3. [部署到 Netlify](#部署到-netlify)
4. [常见问题与解决方案](#常见问题与解决方案)
5. [后续更新流程](#后续更新流程)
6. [参考命令](#参考命令)

---

## 前置准备

### 1. 确认项目类型

本项目使用 Next.js 的**静态导出**功能，适合部署到 Netlify、Vercel、Cloudflare Pages 等平台。

**特点：**
- 纯静态网站，无需服务器
- 加载速度快
- 部署成本低（Netlify 免费套餐即可）

### 2. 准备工作清单

- [x] GitHub 仓库已创建
- [x] 项目代码已推送到 GitHub
- [x] Next.js 项目已配置静态导出
- [ ] Netlify 账户（需要在部署过程中注册）

---

## 项目配置

### Next.js 配置文件 (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 关键配置：启用静态导出
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
};

export default nextConfig;
```

**配置说明：**
- `output: 'export'`：告诉 Next.js 生成静态 HTML 文件
- `images.unoptimized: true`：静态导出不支持 Next.js 图片优化 API

### package.json 脚本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## 部署到 Netlify

### 步骤 1：注册 Netlify 账户

1. 访问 https://app.netlify.com/signup
2. **推荐使用 GitHub 账户登录**
   - 点击 "Sign up with GitHub"
   - 授权 Netlify 访问你的 GitHub 账户

**为什么选择 GitHub 登录？**
- ✅ 代码已在 GitHub 上，连接更方便
- ✅ 后续每次推送代码自动触发部署
- ✅ 无需额外配置认证

### 步骤 2：授权 Netlify 访问 GitHub

GitHub 会显示授权页面，确认以下权限：
- ✅ Verify your GitHub identity
- ✅ Know which resources you can access
- ✅ Act on your behalf
- ✅ Read access to email addresses

**点击 "Authorize Netlify" 继续**

### 步骤 3：选择仓库访问权限

在 "Install Netlify" 页面：

**推荐选择：**
- ✅ **Only select repositories**（只选择特定仓库）
- 选择你的仓库：`personal-website`

**为什么？**
- 更安全，只授权需要的仓库
- 可以随时在 GitHub 设置中修改

### 步骤 4：填写新用户问卷（首次使用）

Netlify 会让你填写一些信息：
1. **How are you planning to use Netlify?**
   - 选择：`Personal`

2. **What kind of project do you want to build first?**
   - 选择：`Personal project` 或 `Blog`

3. **What best describes your role?**
   - 根据实际情况选择（如：Junior Web Developer）

4. **What is the name of your team?**
   - 填写：`personal-website` 或留空

点击 **"Continue to deploy"** 继续。

### 步骤 5：配置构建设置（关键步骤！）

在 "Let's deploy your project" 页面，**点击 "Edit build settings"** 修改以下配置：

| 设置项 | 值 | 说明 |
|--------|-----|------|
| **Branch to deploy** | `main` | 主分支名称 |
| **Base directory** | 留空 | 不需要修改 |
| **Build command** | `npm run build` | 构建命令 |
| **Publish directory** | `out` | ⚠️ 重要！静态导出目录 |
| **Functions directory** | 留空 | 本项目不需要 |

**⚠️ 关键注意点：**
- Netlify 默认可能检测为 `.next` 目录
- **必须改为 `out`**，因为 `next.config.ts` 配置了静态导出
- 如果不改，部署后会显示 404 错误

### 步骤 6：开始部署

配置完成后，点击 **"Deploy personal-website to Netlify"** 按钮。

等待构建完成（通常 1-3 分钟），你会看到：
```
✅ Your deploy completed successfully
```

### 步骤 7：访问网站

部署成功后，你会获得一个 Netlify 子域名：
```
https://cozy-crumble-01bf77.netlify.app
```

点击 **"Open production deploy"** 查看你的网站！

---

## 常见问题与解决方案

### 问题 1：Git 推送失败 - 代理配置问题

**错误信息：**
```
fatal: unable to access 'https://github.com/...':
Failed to connect to 127.0.0.1 port 51081
```

**原因：**
系统配置了代理（如小熊加速器），但 Git 没有正确使用代理。

**解决方案 A：使用 GitHub CLI（推荐）**

```bash
# 检查 GitHub CLI 是否已安装
which gh

# 通过 GitHub API 更新文件（绕过 Git 代理问题）
# 示例：更新单个文件
CONTENT_BASE64=$(base64 -i /path/to/file)
gh api -X PUT repos/OWNER/REPO/contents/PATH/TO/FILE \
  -f message="Commit message" \
  -f content="$CONTENT_BASE64" \
  -f sha="$(gh api repos/OWNER/REPO/contents/PATH/TO/FILE --jq .sha)"
```

**解决方案 B：配置 Git 使用代理**

```bash
# 设置 Git 代理
git config --global http.proxy 'socks5://127.0.0.1:51081'
git config --global https.proxy 'socks5://127.0.0.1:51081'

# 推送代码
git push origin main

# 推送后可以移除代理配置（可选）
git config --global --unset http.proxy
git config --global --unset https.proxy
```

**解决方案 C：使用 GitHub Desktop**
- 下载安装 GitHub Desktop
- 图形界面操作，自动处理代理问题

### 问题 2：部署后显示 404

**原因：**
Publish directory 配置错误，使用了 `.next` 而不是 `out`。

**解决：**
1. 进入 Netlify 项目设置
2. 找到 "Build & deploy" → "Build settings"
3. 将 "Publish directory" 改为 `out`
4. 触发新的部署

### 问题 3：GitHub OAuth 授权失败

**错误信息：**
```
Authentication Error: Invalid state key
```

**解决方案：**
1. 刷新浏览器页面（Cmd + R）
2. 清除浏览器缓存
3. 或者使用邮箱注册 Netlify，稍后在设置中连接 GitHub

### 问题 4：构建失败

**常见原因：**
- 依赖安装失败
- 构建命令错误
- Node.js 版本不匹配

**检查步骤：**
1. 查看 Netlify 部署日志（Deploy log）
2. 确认 `package.json` 中的 `build` 脚本正确
3. 在 Netlify 设置中指定 Node.js 版本：
   ```toml
   [build.environment]
   NODE_VERSION = "18"
   ```

---

## 后续更新流程

部署完成后，更新网站非常简单：

### 方法 1：通过 Git 命令行（需要解决代理问题）

```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "描述你的修改"

# 3. 推送到 GitHub
git push origin main

# 4. Netlify 自动检测并部署
```

### 方法 2：使用 GitHub CLI（推荐）

```bash
# 1. 修改代码
# 2. 提交到本地 Git
git add .
git commit -m "描述你的修改"

# 3. 通过 GitHub API 推送文件
gh api -X PUT repos/zjun1543-oss/personal-website/contents/PATH/TO/FILE \
  -f message="Commit message" \
  -f content="$(base64 -i PATH/TO/FILE)" \
  -f sha="$(gh api repos/zjun1543-oss/personal-website/contents/PATH/TO/FILE --jq .sha)"

# 4. Netlify 自动部署
```

### 方法 3：直接在 GitHub 网页编辑

1. 访问你的仓库页面
2. 点击要编辑的文件
3. 点击铅笔图标 ✏️ 编辑
4. 提交更改（Commit changes）
5. Netlify 自动部署

**部署时间：** 通常 1-3 分钟，取决于项目大小。

---

## 参考命令

### GitHub CLI 常用命令

```bash
# 检查登录状态
gh auth status

# 查看仓库信息
gh repo view zjun1543-oss/personal-website

# 查看文件 SHA
gh api repos/OWNER/REPO/contents/PATH/TO/FILE --jq .sha

# 更新单个文件
CONTENT_BASE64=$(base64 -i file.txt)
gh api -X PUT repos/OWNER/REPO/contents/path/to/file.txt \
  -f message="Update file" \
  -f content="$CONTENT_BASE64" \
  -f sha="PREVIOUS_FILE_SHA"

# 在浏览器中打开仓库
gh repo view --web
```

### Netlify 相关

```bash
# 安装 Netlify CLI（可选）
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 查看部署状态（需要先安装 CLI 并登录）
netlify status
```

### Git 相关

```bash
# 查看未推送的提交
git log origin/main..HEAD --oneline

# 查看当前状态
git status

# 查看远程仓库
git remote -v

# 查看文件差异
git diff origin/main...HEAD --name-only
```

---

## 部署清单

使用这个清单确保每次部署都成功：

- [ ] 代码已本地测试通过（`npm run build` 成功）
- [ ] `next.config.ts` 配置了 `output: 'export'`
- [ ] 代码已推送到 GitHub main 分支
- [ ] Netlify 构建设置正确：
  - [ ] Branch: `main`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `out`
- [ ] 检查 Netlify 部署日志，确认构建成功
- [ ] 在浏览器中测试网站功能
- [ ] 在移动设备上测试响应式布局

---

## 有用的链接

- **Netlify 官网**: https://www.netlify.com/
- **Netlify 文档**: https://docs.netlify.com/
- **Next.js 静态导出文档**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **GitHub CLI 文档**: https://cli.github.com/manual/
- **项目仓库**: https://github.com/zjun1543-oss/personal-website
- **部署地址**: https://cozy-crumble-01bf77.netlify.app

---

## 高级配置（可选）

### 自定义域名

1. 在 Netlify 项目中，进入 **Domain management**
2. 点击 **Add custom domain**
3. 输入你的域名（如 `www.yourdomain.com`）
4. 按照提示配置 DNS 记录

### 环境变量

如果项目需要环境变量：

1. 进入 Netlify 项目设置
2. 找到 **Environment variables**
3. 添加变量（如 `API_KEY`、`NODE_ENV` 等）

### 自动部署配置

默认情况下，每次推送到 `main` 分支都会触发部署。可以在 **Deploy settings** 中：
- 更改部署分支
- 设置部署钩子
- 配置通知（邮件、Slack 等）

---

## 故障排查

### 查看部署日志

1. 进入 Netlify 项目
2. 点击 **Deploys**
3. 选择一个部署记录
4. 点击 **Deploy log** 查看详细日志

### 常见错误代码

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| 404 | Publish directory 配置错误 | 改为 `out` |
| 500 | 构建失败 | 检查构建日志 |
| 502 | 网络问题 | 重新触发部署 |
| 504 | 构建超时 | 优化构建速度或升级套餐 |

---

## 总结

部署 Next.js 静态网站到 Netlify 的关键要点：

1. ✅ **配置静态导出**：`next.config.ts` 设置 `output: 'export'`
2. ✅ **正确的发布目录**：Publish directory 设置为 `out`
3. ✅ **使用 GitHub 登录**：简化部署流程
4. ✅ **解决代理问题**：使用 GitHub CLI 或配置 Git 代理
5. ✅ **自动部署**：推送代码到 GitHub 即可触发部署

**部署成功后，你将拥有：**
- 🚀 快速的静态网站
- 💰 免费的 HTTPS 和 CDN
- 🔄 自动化的部署流程
- 📱 全球 CDN 加速

---

**文档创建时间：** 2026-02-02
**最后更新：** 2026-02-02
**维护者：** zjun1543-oss

如有问题或建议，欢迎在 GitHub 仓库提 Issue！
