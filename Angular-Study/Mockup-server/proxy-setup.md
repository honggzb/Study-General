## Setup a Proxy for API Calls for Your Angular CLI App

- Angular CLI uses webpack-dev-server as the development server. 
- The webpack-dev-server makes use of the powerful http-proxy-middleware package which allows us to send API requests on the same domain when we have a separate API back end development server.

1. create proxy.conf.json in root directory

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

2. edit package.json

`"start": "ng serve --proxy-config proxy.conf.json",`

## Enabling Server-Side Proxy on Angular CLI Apps Which Have Been ejected

edit webpack.config.js

```
"devServer": {
 "historyApiFallback": true,
  "proxy": {
    "/api": {
      "target" : "http://localhost:3000",
      "secure": false
    }
  }
}
```

- `ng eject` is not available for angular 6+
- [Customizing Angular CLI build — an alternative to ng eject (v2)](https://blog.angularindepth.com/customizing-angular-cli-build-an-alternative-to-ng-eject-v2-c655768b48cc)


