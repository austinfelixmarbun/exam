// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  navbarColor: 'lightgray',
  LosURL : 'http://r3web-server.ad-ins.com/LOSR3/',
  WebSocketURL : 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
  // FoundationR3Url: 'http://r3app-server.ad-ins.com/FOUNDATION_R3',
  FoundationR3Url: 'http://localhost:5000',
  Module:"FOU",
  ApprovalURL : 'http://r3app-server/APPROVAL',
  FoundationR3Web:'http://r3web-server.ad-ins.com/Foundation'
  // comment
};
