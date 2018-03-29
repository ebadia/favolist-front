// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//     "target": "http://favolist-dev.eu-west-1.elasticbeanstalk.com",

export const environment = {
  production: false,
  apiUrl: 'http://favolist-dev.eu-west-1.elasticbeanstalk.com/api/v1',
  ws_url: 'ws://favolist-dev.eu-west-1.elasticbeanstalk.com:8080'
}
