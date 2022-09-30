import * as constants from 'lighthouse/lighthouse-core/config/constants';
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


export default devices;