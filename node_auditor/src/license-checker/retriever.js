import { existsSync, readFileSync } from 'fs';

function Retriever(licenseMap, templates) {
  function retrieveLicenseFromLicenseFileContent(content) {
    const lines = content.split('\n');
    const license = lines.find(line => /license/i.test(line));
    const mapped = licenseMap[(license || '').trim()];
    if (mapped) {
      return mapped;
    }
    const withoutFirstLine = lines.slice(1).filter(line => line.length).join('\n');
    return templates[withoutFirstLine] || content;
  }

  function retrieveLicenseFromLicenseFile(filename) {
    if (!existsSync(filename)) {
      return '';
    }
    const content = readFileSync(filename).toString();
    return retrieveLicenseFromLicenseFileContent(content);
  }

  function retrieveLicenseFromReadme(filename) {
    if (!existsSync(filename)) {
      return '';
    }
    const lines = readFileSync(filename).toString().split('\n').filter(line => line);
    const licenseWordIndex = lines.findIndex(line => /#* *License *$/.test(line));
    if (licenseWordIndex < 0) {
      return '';
    }
    const license = lines[licenseWordIndex + 1].trim();
    return licenseMap[license] || license;
  }

  return {
    retrieveLicenseFromLicenseFileContent,
    retrieveLicenseFromReadme,
    retrieveLicenseFromLicenseFile,
  };
}

export default Retriever;
