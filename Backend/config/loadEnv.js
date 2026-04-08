const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const candidatePaths = [
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', '.ENV'),
];

candidatePaths.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: false });
  }
});

module.exports = {
  loadedEnvFiles: candidatePaths.filter((filePath) => fs.existsSync(filePath)),
};
