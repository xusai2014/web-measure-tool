## 本地调试
```shell
npm run dev m https://www.baidu.com/ -- --settings.device desktop
```

## 

[lighthouse 架构图](https://github.com/GoogleChrome/lighthouse/blob/master/docs/architecture.md)

- 驱动装置（Driver）是 puppeteer 和 [Chrome Debug Tool](https://chromedevtools.github.io/devtools-protocol/) 的接口

- 采集器 （Gather）使用驱动装置获取页面信息。共有三类数据 artifacts.json-搜有采集信息 defaultPass.trace.json-大部分性能特征数据 
defaultPass.devtoolslog.jso-开发工具事件日志包括网络请求、加载状态数据

- 审查器 评估测量数据，形成量化指标

- 报告生成装置 生成报告页面


节流设置

````javascript
 interface ThrottlingSettings {
      /** The round trip time in milliseconds. */
      rttMs?: number;
      /** The network throughput in kilobits per second. */
      throughputKbps?: number;
      // devtools settings
      /** The network request latency in milliseconds. */
      requestLatencyMs?: number;
      /** The network download throughput in kilobits per second. */
      downloadThroughputKbps?: number;
      /** The network upload throughput in kilobits per second. */
      uploadThroughputKbps?: number;
      // used by both
      /** The amount of slowdown applied to the cpu (1/<cpuSlowdownMultiplier>). */
      cpuSlowdownMultiplier?: number
}
````
