// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  navbarColor: 'lightgray',
  settingUrl: 'http://r3app.ad-ins.com/setting', //'https://localhost:4999',
  localHostUrl: 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
  r2AppServerUrl: 'http://R2AppServer/POC/api',
  //losUrl : 'http://r3web-server.ad-ins.com/LOSR3/pages/login',
  losUrl : 'http://localhost:4300/pages/login',
  //FoundationR3Url: 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
  FoundationR3Url: 'http://localhost:5000',
  Module:"FOU",
  ApprovalURL : 'http://r3app-server/APPROVAL'
};
