import * as fs from 'fs';

import * as resemble from 'resemblejs';
import * as chromeLauncher from "chrome-launcher";
import config from "./lh-config";
import * as path from "path";
import * as lighthouse from 'lighthouse';
import * as seedRandom from 'seedrandom';
import * as open from 'open';
import devices from "./devices";

const defaultDirectory = 'wml_match';

export default async function (url, image, options) {

    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const {default: ora} = await import('ora');
    const spinner = ora('启动设计稿还原度分析').start();
    try {

        const {
            settings = {}
        } = options;

        const runnerResult = await lighthouse(url, {
            ...options
            , port: chrome.port
        }, {
            ...config,
            settings: {
                ...config.settings,
                ...devices[settings.device],
                onlyAudits: ['final-screenshot'],
                onlyCategories: [
                    'performance'
                ]
            }
        });
        const rng = seedRandom();
        const rstr = rng();
        await chrome.kill();
        const img1Path = runnerResult.lhr.audits['full-page-screenshot']?.details?.screenshot?.data
        const img2path = fs.readFileSync(path.resolve(image)).toString('base64')
        const list = [
            'COMPARE_IMG1',
            'COMPARE_IMG2',
            'COMPARE_RESEMBLE_JS_PATH'
        ];
        const obj = {
            COMPARE_IMG1: img1Path,
            COMPARE_IMG2: 'data:image/jpeg;base64,' + img2path ,
            COMPARE_RESEMBLE_JS_PATH: path.join(__dirname,'../templates/resemble.js')
        }
        let htmlStr = fs.readFileSync(path.join(__dirname,'../templates/compare.html')).toString('utf-8')
        list.map(function (v){
            htmlStr = htmlStr.replace(v,obj[v]);
        })

        const destination_html = path.resolve( `${rstr}test.html`)
        fs.writeFileSync(destination_html, htmlStr);

        await open(destination_html, {app: {name: 'google chrome', arguments: ['--incognito']}});

        spinner.succeed(`设计稿对比完成,预览页地址：${destination_html}`,)
    } catch (e) {
        spinner.fail(`对比失败${e.message}`)
    }

}