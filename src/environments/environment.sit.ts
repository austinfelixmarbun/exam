// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'lightgray',
    LosURL : 'http://r3impl-websvr.ad-ins.com/LOSDSF_SIT/',
    FoundationR3Url: 'http://r3impl-appsvr.ad-ins.com/FOUDSF_SIT',
    WebSocketURL : 'http://r3impl-appsvr.ad-ins.com/FOUDSF_SIT',
    //FoundationR3Url: 'http://localhost:5000',
    Module:"FOU",
    ApprovalURL : 'http://r3impl-appsvr/APPROVAL_DSF',
    FoundationR3Web:'http://r3impl-websvr.ad-ins.com/FOUDSF_SIT',
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    DMSUrl: "http://sky.ad-ins.com/LiteDMS/Integration/ViewDoc.aspx",
  };
  
