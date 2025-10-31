# JSON处理库对比分析平台

这是一个关于JSON处理库深度对比的研究报告前端项目，使用Vite构建，主要对比分析stream-json和large-json-reader-writor两个库的性能、特性、适用场景等。

## 项目特点

- 使用Vite构建的单页应用(SPA)
- 基于Tailwind CSS的现代响应式界面
- 包含交互式图表和详细对比数据
- 提供导航管理功能，支持添加、编辑、删除导航条目
- 使用axios进行API交互
- 通过CDN引入Chart.js和Font Awesome

## 技术栈

- 构建工具: Vite 7.x
- CSS框架: Tailwind CSS 4.x
- HTTP客户端: axios
- 图表库: Chart.js (通过CDN)
- 图标: Font Awesome (通过CDN)

## 安装与运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

- **index.html** - 主页面，包含完整的报告内容和交互式图表
- **src/main.js** - 主要的JavaScript逻辑，包含导航管理和API交互
- **src/style.css** - 全局样式
- **src/counter.js** - 计数器组件
- **public/** - 静态资源目录

## 开发服务器配置

开发服务器配置了API代理，在`vite.config.js`中：

- `/api` -> `http://localhost:5000`
- `/static` -> `http://localhost:5000`

## 注意事项

1. 项目使用中文界面，所有文本内容应使用中文
2. 项目主要是一个展示性的报告页面，包含了大量预定义的对比数据和图表
3. 虽然代码中有导航管理相关的API调用，但主要展示内容已经内联在HTML中
4. 使用了多个CDN资源来加载图表库和图标库
