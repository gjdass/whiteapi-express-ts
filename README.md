## Node API in TypeScript

[![build status](https://gitlab.gjdass.fr/gjdass/whiteapp-express-api-ts/badges/master/build.svg)](https://gitlab.gjdass.fr/gjdass/whiteapp-express-api-ts/commits/master)

This is a white-app designed to start a node ExpressJS API using TypeScript.
You can clone it and start to build your own API.

### Summary

- [Quick start](#quick-start)
    - [Global dependencies](#install-global-dependencies)
    - [Local dependencies](#install-local-dependencies)
    - [Build](#build)
    - [Start](#start)
    - [Test](#test)
- [Configuration](#configuration)
- [Gulp](#gulp)
- [CI with GitLab](#ci-with-gitlab)
- [Datas storage](#datas-storage)

### Quick start

#### Install global dependencies

`npm install -g mocha nodemon gulp`

Mocha for tests, Nodemon for tracking changes in `dist/` directory and keep the API up-to-date and running, Gulp in order to watch and transpil TS `src/` in JS `dist/`.

#### Install local dependencies

`npm install`

#### Build

`gulp build`

To build the project into the `dist/` directory.

See the [Gulp section](#gulp) for more informations about commands.

#### Start

`npm start`

To start the API in dev mode. 

**Note :** It uses `nodemon` in order to watch `dist/` changes that `gulp watch` is producing and reloads the API at each change it detects.

#### Test

`npm test`

Will launch the tests from `tests/*` files.

### Configuration

The app is loading `config/` appropriate configuration file regarding `NODE_ENV` value.

By default, it loads `config/default.json`.

To change `NODE_ENV` value, the app uses `cross-env` package. That way, it will work with any OS you are working on.

See `package.json` for examples.

Default configuration :

```json
{
    "server": {
        "port": 8080
    },
    "jwt": {
        "secret": "dev-secret-1337",
        "expire": "24h"
    },
    "logs": {
        "level": "dev"
    },
    "tests": {
        "auth": {
            "login": "",
            "password": ""
        }
    }
}
```

All of these entries can be overridden in `config/<custom_env>.json` files, even partially like only `server.port`. See the other config files.

### Gulp

Gulp is configured with 5 tasks :
- `build-ts` which triggers the `src/` TypeScript files transpilation
- `build-assets` which triggers the `src/datas` JSON files copy to `dist/datas`
- `watch` which starts watching changes on TS and JSON files into `src/` and triggers builds when needed
- `default` which triggers `watch`
- `build` which triggers a single full build (without watching)

### CI with GitLab

To write.

### Datas storage

Not implemented. To come.