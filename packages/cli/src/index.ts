#!/usr/bin/env node
import { cac } from 'cac';
import lighthouse_func from "./lighthousefunc";
const cli = cac('wml');

import compare from "./compare";

cli.command('m <url>', 'measure 评测web页面')
    .option('-s, --settings <settings>', 'Setting 设置')
    .example('--settings.device desktop')
    .action(async (url,options,...rest) => {
        const {
            settings = {}
        } = options;

        try {
            await lighthouse_func(url, {
                settings
            });
        } catch (e) {
            console.error('wml 工具异常',e)
        }

    });
cli.command('c <url> <image>', 'compare 页面和设计稿')
    .option('-s, --settings <settings>', 'Setting 设置')
    .example('--settings.device desktop')
    .action(async (url,image,options,...rest) => {
        const {
            settings = {}
        } = options;

        try {
            await compare(url,image,options)
        } catch (e) {
            console.error('wml 工具异常',e)
        }

    });

cli.help();

try {
    cli.parse();
} catch (e) {
    console.warn('命令行报错，请检查输入项')
}
