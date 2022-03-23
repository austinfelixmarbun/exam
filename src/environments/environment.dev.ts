// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  navbarColor: 'transparent',
  //losUrl: 'http://localhost:5001',
  //FoundationR3Url: 'http://localhost:5000',
  LosURL: 'http://r3app-server.ad-ins.com/LOS_DEV',
  FoundationR3Url: 'http://r3app-server.ad-ins.com/FOUNDATION_DEV',
  DMSUrl: "http://sky.ad-ins.com/LITEDMS_POC/Integration/ViewDoc.aspx",
  AMSUrl: "http://r3app-server.ad-ins.com/AMS_DEMO", //OPL dah ada
  LMSUrl: "http://r3app-server.ad-ins.com/LMS_DEMO", //OPL dah ada
  lmsWeb: "http://r3impl-websvr.ad-ins.com/LMS", //sementara ku tak tau
  //ApprovalURL: 'http://r3app-server.ad-ins.com/FOUNDATION_R3/Approval',
  ApprovalR3Url: 'http://r3app-server.ad-ins.com/Approval_R3_BE_SPRINGBOOT',
  ApprovalURL: 'http://r3impl-appsvr.ad-ins.com/APPROVAL_DSF_R3_SIT',
  FoundationR3Web: 'http://r3web-server.ad-ins.com/FOUNDATION_DEV',
  losR3Web: 'http://r3web-server.ad-ins.com/LOS_DEV',
  cmsR3Web: 'http://r3web-server.ad-ins.com/CMS',
  WorkflowR3Url: 'http://R3App-Server.ad-ins.com/WORKFLOW_R3',
  WebSocketURL: 'http://r3app-server.ad-ins.com/FOUNDATION_DEV',
  DashboardURL: 'http://r3app-server.ad-ins.com/Dashboard',
  dmsURL: 'http://kfx-svr/LITEDMS_POC/LiteDMS/pageconfins.aspx',
  WFThingsToDoUrl: 'http://r3impl-appsvr.ad-ins.com/WORKFLOW_OPL/',
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
  Module: "FOU",
  isCore: true,
  SpinnerOnHttpPost: false
};
