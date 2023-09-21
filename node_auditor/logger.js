/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import licenseAuditor from './src/checkLicenses.js';

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

const warnMarkdown = licenseObj => {
  markdown(':yellow_circle:', licenseObj);
};

const errorMarkdown = licenseObj => {
  markdown(':red_circle', licenseObj);
};

const markdown = (icon, licenseItem) => {
  console.log(`| ${icon} | ${licenseItem.path} | ${licenseItem.licenses} | ${licenseItem.licensePath} | ${licenseItem.repository} | ${licenseItem.publisher} | ${licenseItem.email} | ${licenseItem.version} |`);
};

const markdownTableHeader = () => {
  console.log('|  | MODULE PATH | LICENSE | LICENSE PATH | REPOSITORY | PUBLISHER | EMAIL | VERSION |');
  console.log('|---|---|---|---|---|---|---|---|');
};

markdownTableHeader();

licenseAuditor({
  whitelistedLicenses: whitelist,
  blacklistedLicenses: blacklist,
  projectPath: process.env.PROJECT_PATH,
  ciManager: {
    warn,
    fail,
  },
  consoleManager: {
    warnMarkdown,
    errorMarkdown,
  }
});
