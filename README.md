# luatss-pro-gamer-web

这是一个展示 CS选手数据 的网页应用。

## 项目简介

本项目最开始是为了整蛊和嘲讽我的一位CS队友。这个网站可以呈现他的各种游戏数据 表现 甚至视频集锦。除此之外，该网站也可以作为一个工具，用于展示CS2选手的数据和表现分析，为其他用户提供类似的娱乐和数据展示功能。项目采用现代Web技术构建，你也许可以基于这个改改给你的朋友也做个, 或者做个属于自己的。

**示例**: 本项目是一个展示 CS2 选手数据和表现的网页应用，旨在为用户提供详细的选手数据分析和可视化，帮助用户更好地了解选手的游戏表现和历史战绩。

你可以访问 https://luatss.enou.org 查看效果

## 功能

本项目提供以下主要功能：

- **功能1**: 提供详细的选手数据统计。
- **功能2**: 展示选手的成就和战绩，帮助用户全面了解选手的表现。
- **功能3**: 支持通过社交媒体链接关注选手的最新动态。
- **功能4**: 展示一些金句名言 视频集锦 他人评价 粉丝留言之类的东西。
- **功能5**: 展示选手的cfg设置。
- **功能6**: 一个简单的瞄准训练器。

## 未来的功能
- 让不会编码的人也可以更简单的编辑
- 更好展示选手的游戏设置 甚至皮肤和外设

## 技术栈

项目使用了以下主要技术和框架：

- **React**: 用于构建现代化的界面。
- **Framer Motion**: 用于实现丰富的动画效果。
- **TypeScript**: 提供静态类型检查，增强代码的安全性和可维护性。

## 安装和运行

### 克隆项目

```bash
git clone [项目的GitHub链接]
cd [项目文件夹名称]
```

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm start
```

项目将在 `http://localhost:3000` 上运行。

### 构建生产版本

```bash
npm run build
```

生成的生产版本文件将位于 `build/` 文件夹中。

## 项目结构

```plaintext
项目文件夹/
├── node_modules/         # 项目依赖的第三方库
├── public/               # 静态文件
│   ├── sounds/           # 声音文件（如 hit.mp3, miss.mp3）
│   ├── favicon.ico       # 网站图标
│   ├── favicon.png       # 网站图标的PNG格式
│   ├── index.html        # 主HTML文件
│   ├── robots.txt        # 搜索引擎的爬虫配置文件
├── src/                  # 源代码
│   ├── assets/           # 资源文件夹
│   ├── components/       # 组件目录
│   ├── lib/              # 工具函数库
│   ├── images.d.ts       # 类型定义文件，用于处理图像导入
│   ├── LuatssAimTrainer.tsx # Luatss瞄准训练组件
│   ├── LuatssProGamer.tsx   # Luatss职业玩家页面组件
│   ├── index.tsx         # 项目入口文件
│   ├── index.css         # 全局样式文件
│   ├── index.js          # 项目的JavaScript入口文件
├── .gitignore            # Git忽略的文件列表
├── package.json          # 项目依赖和脚本配置文件
├── package-lock.json     # 锁定依赖版本的文件
├── postcss.config.js     # PostCSS的配置文件
├── tailwind.config.js    # Tailwind CSS的配置文件
├── tsconfig.json         # TypeScript配置文件
├── README.md             # 项目说明文件

```

## 许可证

本项目使用 [GNU Affero General Public License v3.0 (AGPL)](https://www.gnu.org/licenses/agpl-3.0.html) 进行许可。根据该许可证：

- 您可以自由地使用、修改和分发本项目的代码。
- 如果您将修改后的代码分发或用于网络服务，您必须将修改后的源代码使用相同的许可证公开。

## 贡献

我们欢迎贡献者为本项目做出贡献。请遵循以下步骤：

1. **Fork** 本仓库
2. 创建分支 (`git checkout -b feature/YourFeature`)
3. 提交修改 (`git commit -m 'Add YourFeature'`)
4. 推送到分支 (`git push origin feature/YourFeature`)
5. 打开一个 **Pull Request**

## 联系我

邮箱: bOOOOc@outlook.com
