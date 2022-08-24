const { typescript, javascript, github } = require('projen');
const project = new typescript.TypeScriptProject({
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
  authorName: 'Taimos GmbH',
  authorEmail: 'info@taimos.de',
  authorOrganization: true,
  authorUrl: 'https://taimos.de',
  copyrightOwner: 'Taimos GmbH',
  copyrightPeriod: '2022',
  license: 'Apache-2.0',
  licensed: true,
  stability: 'experimental',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  gitpod: true,
  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ['hoegertn', 'taimos-projen[bot]'], secret: 'GITHUB_TOKEN' },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  pullRequestTemplateContents: [`* **Please check if the PR fulfills these requirements**
- [ ] The commit message describes your change
- [ ] Tests for the changes have been added if possible (for bug fixes / features)
- [ ] Docs have been added / updated (for bug fixes / features)
- [ ] Changes are mentioned in the changelog (for bug fixes / features)

* **What kind of change does this PR introduce?** (Bug fix, feature, docs update, ...)


* **What is the current behavior?** (You can also link to an open issue here)


* **What is the new behavior (if this is a feature change)?**


* **Does this PR introduce a breaking change?** (What changes might users need to make in their setup due to this PR?)


* **Other information**:`],
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

project.gitpod.addCustomTask({
  init: 'yarn install --check-files --frozen-lockfile',
  command: 'npx projen build',
});

project.synth();
