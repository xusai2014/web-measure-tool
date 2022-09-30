import * as fs from 'fs';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher  from 'chrome-launcher';
import * as path from 'path';
import * as seedRandom from 'seedrandom';
import config from './lh-config';
import devices from "./devices";


const defaultDirectory = 'wml_lh';
export default async function (url:string,options:any) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const { default:ora } = await import('ora');
    const spinner = ora('启动性能评估抓取').start();
    const {
        settings
    } = options;

    const runnerResult = await lighthouse(url, {
        ...options
        , port: chrome.port
    },{
        ...config,
        settings: {
            ...config.settings,
            ...devices[settings.device],
        }
    });

    // config.settings.emulatedFormFactor = 'desktop';
    const reportHtml = runnerResult.report;

    if (!fs.existsSync(path.resolve(defaultDirectory))) {
        fs.mkdirSync(path.resolve(defaultDirectory));
    }

    const rng = seedRandom();

    //  runnerResult.lhr： lighthouseVersion、requestedUrl、finalUrl、audits
    const pathname = path.resolve(defaultDirectory+'/report-'+rng()+'.html')
    fs.writeFileSync(pathname, reportHtml);
    await chrome.kill();
    spinner.succeed(`生成性能评估报告${pathname}`)

}