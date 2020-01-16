const is = require('@sindresorhus/is');
const fs = require('fs');
const path = require('path');
const pJson = require('./package.json');

const repoGroups = {
  'ag-grid': 'https://github.com/ag-grid/ag-grid',
  'algolia-react-instantsearch':
    'https://github.com/algolia/react-instantsearch',
  'apollo-server': 'https://github.com/apollographql/apollo-server',
  'aspnet AspNetWebStack': 'https://github.com/aspnet/AspNetWebStack',
  'aspnet Extensions': 'https://github.com/aspnet/Extensions',
  'aws-cdk': 'https://github.com/aws/aws-cdk',
  'azure azure-libraries-for-net':
    'https://github.com/Azure/azure-libraries-for-net',
  'azure azure-sdk-for-net': 'https://github.com/Azure/azure-sdk-for-net',
  'azure azure-storage-net': 'https://github.com/Azure/azure-storage-net',
  'bugsnag-js': 'https://github.com/bugsnag/bugsnag-js',
  'devextreme-reactive': 'https://github.com/DevExpress/devextreme-reactive',
  'electron-forge': 'https://github.com/electron-userland/electron-forge',
  'ember-decorators': 'https://github.com/ember-decorators/ember-decorators',
  'graphql-modules': 'https://github.com/Urigo/graphql-modules',
  'ionic-native': 'https://github.com/ionic-team/ionic-native',
  'mdc-react': 'material-components/material-components-web-react',
  'ngxs-store': 'https://github.com/ngxs/store',
  'react-dnd': 'https://github.com/react-dnd/react-dnd',
  'reactivestack-cookies': 'https://github.com/reactivestack/cookies',
  'semantic-release': 'https://github.com/semantic-release/',
  'telus-tds': 'https://github.com/telusdigital/tds',
  'typescript-eslint': 'https://github.com/typescript-eslint/typescript-eslint',
  'typography-js': 'https://github.com/KyleAMathews/typography.js',
  'vue-cli': 'https://github.com/vuejs/vue-cli',
  accounts: 'https://github.com/accounts-js/accounts',
  angular1: 'https://github.com/angular/angular.js',
  angular: 'https://github.com/angular/angular',
  angularcli: 'https://github.com/angular/angular-cli',
  apolloclient: 'https://github.com/apollographql/apollo-client',
  apollolink: 'https://github.com/apollographql/apollo-link',
  awsappsync: 'https://github.com/awslabs/aws-mobile-appsync-sdk-js',
  babel: 'https://github.com/babel/babel',
  baset: 'https://github.com/igmat/baset',
  capacitor: 'https://github.com/ionic-team/capacitor',
  clarity: 'https://github.com/vmware/clarity',
  commitlint: 'https://github.com/conventional-changelog/commitlint',
  emotion: 'https://github.com/emotion-js/emotion',
  expo: 'https://github.com/expo/expo',
  fimbullinter: 'https://github.com/fimbullinter/wotan',
  flopflip: 'https://github.com/tdeekens/flopflip',
  framework7: 'https://github.com/framework7io/framework7',
  gatsby: 'https://github.com/gatsbyjs/gatsby',
  graphqlcodegenerator: [
    'https://github.com/dotansimha/graphql-code-generator',
    'https://github.com/dotansimha/graphql-codegen',
  ],
  infrastructure: 'https://github.com/instructure/instructure-ui',
  jest: 'https://github.com/facebook/jest',
  lerna: 'https://github.com/lerna/lerna',
  lingui: 'https://github.com/lingui/js-lingui',
  lodash: 'https://github.com/lodash/',
  material: 'https://github.com/material-components/material-components-web',
  mdx: 'https://github.com/mdx-js/mdx',
  mui: 'https://github.com/mui-org/material-ui',
  nest: 'https://github.com/nestjs/nest',
  neutrino: [
    'https://github.com/neutrinojs/neutrino',
    'https://github.com/mozilla-neutrino/neutrino-dev',
  ],
  nextjs: 'https://github.com/zeit/next.js',
  ngrx: 'https://github.com/ngrx/',
  nrwl: 'https://github.com/nrwl/',
  nuxtjs: 'https://github.com/nuxt/nuxt.js',
  picasso: 'https://github.com/qlik-oss/picasso.js',
  pouchdb: 'https://github.com/pouchdb/pouchdb',
  react: 'https://github.com/facebook/react',
  reactrouter: 'https://github.com/ReactTraining/react-router',
  remark: 'https://github.com/remarkjs/remark',
  router5: 'https://github.com/router5/router5',
  sentry: 'https://github.com/getsentry/sentry-javascript',
  springfox: 'https://github.com/springfox/springfox',
  sanity: 'https://github.com/sanity-io/sanity',
  storybook: 'https://github.com/storybookjs/storybook',
  strapi: 'https://github.com/strapi/strapi',
  stryker: 'https://github.com/stryker-mutator/stryker',
  surveyjs: 'https://github.com/surveyjs/surveyjs',
  typefaces: 'https://github.com/KyleAMathews/typefaces',
  uppy: 'https://github.com/transloadit/uppy',
  vue: 'https://github.com/vuejs/vue',
  vuepress: 'https://github.com/vuejs/vuepress',
  webdriverio: 'https://github.com/webdriverio/webdriverio',
  workbox: 'https://github.com/googlechrome/workbox',
};

const patternGroups = {
  babel6: '^babel6$',
  wordpress: '^@wordpress/',
  angularmaterial: ['^@angular/material', '^@angular/cdk'],
  'aws-java-sdk': '^com.amazonaws:aws-java-sdk-',
};

async function go() {
  const config = {};
  for (const [name, value] of Object.entries(repoGroups)) {
    config[name] = {
      description: `${name} monorepo`,
      sourceUrlPrefixes: is.array(value) ? value : [value],
    };
  }
  for (const [name, value] of Object.entries(patternGroups)) {
    config[name] = {
      description: `${name} monorepo`,
      packagePatterns: is.array(value) ? value : [value],
    };
  }
  // Write rules in alphabetical order
  pJson['renovate-config'] = {};
  for (const rule of Object.keys(config).sort()) {
    pJson['renovate-config'][rule] = config[rule];
  }
  fs.writeFileSync(
    path.join(__dirname, 'package.json'),
    `${JSON.stringify(pJson, null, 2)}\n`
  );
}

go();
