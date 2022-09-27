import * as fs from 'fs';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher  from 'chrome-launcher';
import * as path from 'path';
import * as seedrandom from 'seedrandom';
const defaultDirectory = 'lh';
export default async function (url:string,options:any) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const runnerResult = await lighthouse(url, {...options, port: chrome.port});
    const reportHtml = runnerResult.report;

    if (!fs.existsSync(path.resolve(defaultDirectory))) {
        fs.mkdirSync(path.resolve(defaultDirectory));
    }

    const rng = seedrandom();
    fs.writeFileSync(path.resolve(defaultDirectory+'/report-'+rng()+'.html'), reportHtml);

    
    await chrome.kill();

}