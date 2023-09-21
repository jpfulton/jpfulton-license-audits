export const noPathSpecified = 'Project path is not specified.';
export const noLicenses = 'There are no licenses to check';
export const moduleInfo = licenseItem => `MODULE PATH: ${licenseItem.path}
| LICENSE: ${licenseItem.licenses}
| LICENSE PATH: ${licenseItem.licensePath}
| REPOSITORY: ${licenseItem.repository}
| PUBLISHER: ${licenseItem.publisher}
| EMAIL: ${licenseItem.email}
| VERSION: ${licenseItem.version}
`;

export default { noPathSpecified, noLicenses, moduleInfo };
