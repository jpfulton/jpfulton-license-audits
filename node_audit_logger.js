/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import licenseAuditor from '@brainhubeu/license-auditor';

import whitelist from './licenses/whitelist.js';
import blacklist from './licenses/blacklist.js';

const warn = msg => {
  // eslint-disable-next-line no-console
  console.log('%s', `LICENSE WARNING AT ${msg}`);
};

const fail = msg => {
  // eslint-disable-next-line no-console
  console.log('%s', `BLACKLISTED LICENSE AT ${msg}`);
};

licenseAuditor({
  whitelistedLicenses: whitelist,
  blacklistedLicenses: blacklist,
  projectPath: process.env.PROJECT_PATH,
  ciManager: {
    warn,
    fail,
  },
});
