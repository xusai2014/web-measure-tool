#!/usr/bin/env node
import { cac } from 'cac';
import lighthouse_func from "./lighthousefunc";
const cli = cac('wml');

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

cli.help();

try {
    cli.parse();
} catch (e) {
    console.warn('命令行报错，请检查输入项')
}
