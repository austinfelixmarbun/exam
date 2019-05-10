// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  foundationUrl:'http://r3app-server/foundation',
  settingUrl:'http://r3app-server/setting',
  localHostUrl: 'http://R2AppServer/CONFINS',
  r2AppServerUrl:'http://R2AppServer/POC/api',
  losUrl : 'http://localhost:4444/pages/login'
};
