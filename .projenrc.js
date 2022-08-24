const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  authorName: 'Taimos GmbH',
  authorEmail: 'info@taimos.de',
  authorOrganization: true,
  defaultReleaseBranch: 'main',
  name: 'leapp-shellcreds',
  description: 'Plugin to copy AWS credentials in a shell compatible format',
  keywords: ['leapp-plugin'],
  deps: [
    '@noovolari/leapp-core',
    'clipboardy',
  ],
  devDeps: [
    // 'esbuild',
    'ts-loader',
    'webpack',
    'webpack-cli',
  ],
});

project.gitignore.exclude('plugin.js');
project.package.addField('files', ['plugin.js']);
project.package.addField('leappPlugin', {
  supportedOS: [
    'mac',
    'windows',
    'linux',
  ],
  supportedSessions: [
    'awsIamRoleFederated',
    'awsIamRoleChained',
    'awsSsoRole',
    'awsIamUser',
    'aws',
  ],
});

project.projectBuild.compileTask.reset('webpack --config webpack.config.js');
// project.projectBuild.compileTask.reset('esbuild --bundle src/index.ts --outfile=plugin.js --format=cjs --platform=node'); //--minify --sourcemap');

const installTask = project.addTask('deploy');
installTask.spawn(project.buildTask);
installTask.exec('mkdir -p ~/.Leapp/plugins/leapp-shellcreds && cp plugin.js package.json ~/.Leapp/plugins/leapp-shellcreds/');

project.synth();
