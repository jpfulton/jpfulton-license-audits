import { findAllLicenses } from './license-checker/licenseChecker.js';
import { noPathSpecified, noLicenses } from './messages.js';
import ciNotification from './ciNotifications.js';
import parseLicensesFactory from './parseLicenses.js';

const checkLicenses = async ({
  whitelistedLicenses,
  blacklistedLicenses,
  whitelistedModules = {},
  projectPath,
  ciManager,
  consoleManager,
}) => {
  const { createWarnNotification, createErrorNotification } = ciNotification(
    ciManager,
  );

  const { createWarnMarkdown, createErrorMarkdown } = consoleManager;

  if (!projectPath) {
    return createErrorNotification(noPathSpecified);
  }

  try {
    const licenses = await findAllLicenses({ projectPath });

    if (!licenses || licenses.length <= 0) {
      return createWarnNotification(noLicenses);
    }

    const parse = parseLicensesFactory({
      whitelistedLicenses,
      blacklistedLicenses,
      whitelistedModules,
      createWarnNotification,
      createErrorNotification,
      createWarnMarkdown,
      createErrorMarkdown,
    });

    parse(licenses);
  } catch (err) {
    return createErrorNotification(err);
  }
};

export default checkLicenses;
