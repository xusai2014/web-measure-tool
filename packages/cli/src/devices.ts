import * as constants from 'lighthouse/lighthouse-core/config/constants';
const devices = {
    desktop: {
        formFactor: 'desktop',
        screenEmulation: constants.screenEmulationMetrics.desktop,
        emulatedUserAgent: constants.userAgents.desktop,
    },
    per: {
        throttlingMethod: 'devtools',
        onlyCategories: ['performance'],
    },
    mobile: {
        formFactor: 'mobile',
        screenEmulation: constants.screenEmulationMetrics.mobile,
        emulatedUserAgent: constants.userAgents.mobile,
    }
}


export default devices;