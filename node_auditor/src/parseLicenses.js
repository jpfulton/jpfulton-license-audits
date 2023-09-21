import messages from './messages.js';

const parseLicenses = ({
  whitelistedLicenses,
  blacklistedLicenses,
  whitelistedModules = {},
  createWarnNotification,
  createErrorNotification,
  createWarnMarkdown,
  createErrorMarkdown,
}) => licenses => {
  licenses.forEach(licenseObj => {
    const whitelistedLicenseForModule = whitelistedModules[licenseObj.name];
    if (whitelistedLicenseForModule === 'any') {
      return;
    }
    const whitelistedLicensesForModule = Array.isArray(whitelistedLicenseForModule)
      ? whitelistedLicenseForModule
      : [whitelistedLicenseForModule];


    const isWhitelisted = Array.isArray(licenseObj.licenses)
      ? licenseObj.licenses.every(license =>
        [...whitelistedLicenses, ...whitelistedLicensesForModule].includes(license),
      )
      : [...whitelistedLicenses, ...whitelistedLicensesForModule].includes(licenseObj.licenses);

    if (isWhitelisted) {
      return;
    }

    const isBlacklisted = Array.isArray(licenseObj.licenses)
      ? licenseObj.licenses.some(license =>
        blacklistedLicenses.includes(license),
      )
      : blacklistedLicenses.includes(licenseObj.licenses);

    if (!isWhitelisted && !isBlacklisted) {
      return createWarnMarkdown ?
        createWarnMarkdown(licenseObj) :
        createWarnNotification(messages.moduleInfo(licenseObj));
    }

    if (isBlacklisted) {
      return createErrorMarkdown ?
        createErrorMarkdown(licenseObj) :
        createErrorNotification(messages.moduleInfo(licenseObj));
    }
  });
};

export default parseLicenses;
