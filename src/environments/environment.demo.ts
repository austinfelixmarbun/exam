// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  navbarColor: 'lightgray',
  LosURL: 'http://r3web.ad-ins.com/LOS_DEMO/',
  FoundationR3Url: 'http://r3app-server.ad-ins.com/FOUNDATION_DEMO',
  WebSocketURL : 'http://r3app-server.ad-ins.com/FOUNDATION_DEMO',
  Module:"FOU",
  ApprovalURL : 'http://r3app-server.ad-ins.com/APPROVAL_DEMO',
  FoundationR3Web:'http://r3web.ad-ins.com/FOUNDATION_DEMO',
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
  DMSUrl: "http://sky.ad-ins.com/LiteDMS/Integration/ViewDoc.aspx",
};


