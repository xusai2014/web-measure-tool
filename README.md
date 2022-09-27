# web-measure-tool 性能分析工具

关键点：源站响应、网络分析、程序运行、端侧分析

目标：建立指标数据报告，自动化检测，可作为探针使用




# 项目技术细节

- workspace

yarn add docz  react react-dom --save -W
yarn add typescript cross-env --save-dev -W


- 模块解析

经典模式： 相对导入当前文件夹路径查找 ts 或 d.ts，非相对倒入 目录依次递归向外层查找ts 或 d.ts

node模式：require函数，分析相对导入路径是否存在文件，不存在文件视为目录查找检查package.json main,如果没有则找index.js.
非相对导入 node_modules 依次向外查找，先找文件 再找 package.json main 然后再找index

docz
```shell
 yarn add docz react react-dom --save -W
 yarn add  cross-env --dev -W  
 yarn add @emotion/core@10.1.1 --save ### fixed bug Can't resolve '@emotion/core'
  yarn add  remark-mdx@2.0.0-next.9 --dev -W  ###fixed bug Error [ERR_REQUIRE_ESM]: require() of ES Module 
```

storybook

```shell
npx sb init --disable-telemetry -t react -b vite -p tsx -s
```