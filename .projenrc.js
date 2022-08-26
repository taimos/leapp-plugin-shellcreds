const { LeappPluginProject } = require('@taimos/projen-leapp-plugin');
const { javascript, github } = require('projen');

const project = new LeappPluginProject({
  defaultReleaseBranch: 'main',
  name: 'leapp-shellcreds',
  description: 'Plugin to copy AWS credentials in a shell compatible format',
  deps: [
    'clipboardy',
  ],
  devDeps: [
    '@taimos/projen-leapp-plugin',
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

project.gitpod.addCustomTask({
  init: 'yarn install --check-files --frozen-lockfile',
  command: 'npx projen build',
});

project.synth();
