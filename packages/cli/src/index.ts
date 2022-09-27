import { cac } from 'cac';
import lighthousefunc from "./lighthousefunc";
const cli = cac('wml');

cli.command('m <url>', 'desc')
    .option('--throttling <args>', 'Set envs')
    .example('--throttling.rttMs xxx')
    .action(async (url,options) => {
        const {
            throttling = {}
        } = options;
        const defaultOptions = {logLevel: 'info', output: 'html', onlyCategories: ['performance']};
        await lighthousefunc(url, {
            ...defaultOptions,
            throttling
        });
    });

cli.help();

cli.parse();
