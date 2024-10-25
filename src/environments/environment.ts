// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in  `.angular-cli.json`.

export const environment = {
  production: false,
  navbarColor: '#E7EFF8',
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
  Module: "IAM",
  isCore: true,
  SpinnerOnHttpPost: false,
  isPageFromService: false,
  useSafeUrl: true,

  // Keycloak Open ID Integration
  identityProviders: {
    enabled: true,
    issuer: "",
  },
};
