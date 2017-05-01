## Node API in TypeScript

[![build status](https://gitlab.gjdass.fr/gjdass/whiteapi-express-api-ts/badges/master/build.svg)](https://gitlab.gjdass.fr/gjdass/whiteapi-express-api-ts/commits/master)

This is a white-app designed to start a node ExpressJS API using TypeScript.
You can clone it and start to build your own API.

### Summary

- [Quick start](#quick-start)
- [Dependencies](#dependencies)
- [Commands](#commands)
    - [Watch](#watch)
    - [Build](#build)
    - [Start](#start)
    - [Test](#test)
- [Configuration](#configuration)
- [Gulp](#gulp)
- [CI with GitLab](#ci-with-gitlab)
- [Datas storage](#datas-storage)

### Quick start

Install dependencies, build and start server.

```shell
$> npm install
$> npm run build
$> npm start
```

### Dependencies

We use local dependencies only for practical matters. No need to install global ones since NPM lets us use local packages thanks to `package.json` scripts. Feel free to install some packages globally such as `gulp` or `nodemon` and `mocha` if you prefer run things by yourself.

See `package.json` to get the list.

__Note__ : dependencies are for now not well versionned since I don't really care for development.

### Commands

`npm` handles all the commands for the project. It uses `gulp` underneath for build and watch.

#### Watch

`npm run watch`

Run a [build](#build) and then watch the TypeScript files for changes (using `gulp`).

#### Build

`npm run build`

To build the project into the `dist/` directory (using `gulp`).
Sourcemaps are generated in order to be able to debug into VSCode (TS -> JS).

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

Gulp has 5 tasks configured :
- `build-ts` which triggers the `src/` TypeScript files transpilation with sourcemaps generation
- `build-assets` which triggers the `src/datas` JSON files copy to `dist/datas`
- `watch` which starts watching changes on TS and JSON files into `src/` and triggers builds when needed
- `default` which triggers `watch`
- `build` which triggers a single full build (without watching)

### CI with GitLab

To write.

### Datas storage

Not implemented. To come.