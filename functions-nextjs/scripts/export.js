var shell = require('shelljs');
var nextjsConfig = require('../next.config');
var BUILD_ID = shell.cat(`${nextjsConfig.distDir}/BUILD_ID`);

function hoistPages(fileExt, outputPath) {
  console.log(
    `${nextjsConfig.distDir}/server/static/${BUILD_ID}/pages/**/*${fileExt} -> ${outputPath}/`
  );
  shell.mkdir('-p', outputPath);
  var match = new RegExp('\\' + `${fileExt}`);
  var filesToHoist = shell
    .find(`${nextjsConfig.distDir}/server/static/${BUILD_ID}/pages/`)
    .filter(function (file) {
      // ensure the file has the required extension and is not a dynamic route (/blog/[pid])
      return file.match(match) && file.match(/^((?!\[|\]).)*$/);
    });
  filesToHoist.forEach((filePath) => {
    var outPath = filePath.split('pages/')[1];
    if (outPath.includes('/')) {
      shell.mkdir(
        '-p',
        `${outputPath}/${outPath.substring(0, outPath.lastIndexOf('/'))}`
      );
    }
    shell.cp('-f', filePath, `${outputPath}/${outPath}`);
  });
}

console.log(
  "next export doesn't support getServerSideProps() so we perform our own copy of static assets to prepare our Firebase Hosting upload"
);
console.log(
  'Hoist public/ Next.js runtime and optimised chunks, computed .html and .json data\n'
);

console.log('public/ -> out/');
shell.mkdir('-p', 'out/');
shell.cp('-Rf', 'public/*', 'out/');

console.log(`${nextjsConfig.distDir}/static/ -> out/_next/static/`);
shell.mkdir('-p', 'out/_next/static/');
shell.cp('-Rf', `${nextjsConfig.distDir}/static/`, 'out/_next/');

hoistPages('.html', 'out');
hoistPages('.json', `out/_next/data/${BUILD_ID}`);
