import * as fs from 'fs';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher  from 'chrome-launcher';
import * as path from 'path';
import * as seedRandom from 'seedrandom';
import * as constants from 'lighthouse/lighthouse-core/config/constants';
import config from './lh-config';

const devices = {
    desktop: {
        formFactor: 'desktop',
        throttling: constants.throttling.desktopDense4G,
        screenEmulation: constants.screenEmulationMetrics.desktop,
        emulatedUserAgent: constants.userAgents.desktop,
    },
    per: {
        throttlingMethod: 'devtools',
        onlyCategories: ['performance'],
    },
    mobile: {

    }
}

const defaultDirectory = 'lh';
export default async function (url:string,options:any) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
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
    console.info("生成性能评估报告", pathname)

}