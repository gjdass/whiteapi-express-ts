## Node API in TypeScript

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
- [Datas storage](#datas-storage)

### Quick start

#### Install global dependencies

`npm install -g mocha nodemon gulp`

Mocha for tests, Nodemon for tracking changes in `dist/` directory and keep the API up-to-date and running, Gulp in order to watch and transpil TS `src/` in JS `dist/`.

#### Install local dependencies

`npm install`

#### Build

`gulp`

To build the project into the `dist/` directory and watching for changes in `src/` directory.

See the `gulpfile.js` for more informations about commands.

#### Start

`npm start`

To start the API in dev mode. It uses `nodemon` package in order to watch `dist/` changes gulp is producing and reload the API at each change.

#### Test

`npm test`

Will launch (with Mocha) the tests in `tests/` directory.

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

### Datas storage

To come.