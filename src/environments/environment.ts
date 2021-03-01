// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  navbarColor: 'lightgray',
  LosURL: 'http://r3impl-websvr.ad-ins.com/LOSDSF/',
  WebSocketURL: 'http://r3impl-appsvr.ad-ins.com/FOUDSF',
  FoundationR3Url: 'http://r3impl-appsvr.ad-ins.com/FOUDSF',
  // FoundationR3Url: 'http://localhost:5000',
  Module: "FOU",
  ApprovalURL: 'http://r3impl-appsvr.ad-ins.com/APPROVAL_DSF',
  FoundationR3Web: 'http:/r3impl-websvr.ad-ins.com/FOUDSF',
  DMSUrl: "http://sky.ad-ins.com/LiteDMS/Integration/ViewDoc.aspx",
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE

};
