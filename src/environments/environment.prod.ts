// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'transparent',
    LosURL : 'http://r3web-server.ad-ins.com/LOSR3/',
    FoundationR3Url: 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
    WebSocketURL : 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
    Module:"FOU",
    losR3Web: 'http://r3web-server/LOSR3',
    lmsWeb: 'http://r3impl-websvr.ad-ins.com/LMS',
    ApprovalURL : 'http://r3app-server/APPROVAL',
    FoundationR3Web:'http://r3web-server.ad-ins.com/Foundation',
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    DMSUrl: "http://sky.ad-ins.com/LiteDMS/Integration/ViewDoc.aspx",
};