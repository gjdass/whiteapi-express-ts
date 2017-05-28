# Node API in TypeScript

[![build status](https://gitlab.gjdass.fr/gjdass/whiteapi-express-ts/badges/master/build.svg)](https://gitlab.gjdass.fr/gjdass/whiteapi-express-api-ts/commits/master)

This is a white-app designed to start a node ExpressJS API using TypeScript.
You can clone it and start to build your own API.

**WIP**

## Summary

- [Quick start](#quick-start)
- [Dependencies](#dependencies)
- [Commands](#commands)
    - [Watch](#watch)
    - [Build](#build)
    - [Start](#start)
    - [Test](#test)
- [Configuration](#configuration)
- [Logs](#logs)
- [Gulp](#gulp)
- [CI with GitLab](#ci-with-gitlab)
- [Datas storage](#datas-storage)
    - [MongoDB](#mongodb)

***

## Quick start

Install dependencies, build and start server.

```shell
$ npm install
$ npm run build
$ npm start
```

## Dependencies

We use local dependencies only for practical matters. No need to install global ones since NPM lets us use local packages thanks to `package.json` scripts. Feel free to install some packages globally such as `gulp` or `nodemon` and `mocha` if you prefer run things by yourself.

See `package.json` to get the list.

__Note__ : dependencies are for now not well versionned since I don't really care for development.

## Commands

`npm` handles all the commands for the project. It uses `gulp` underneath for build and watch.

### Watch

```shell
$ npm run watch
```

Run a [build](#build) and then watch the TypeScript files for changes (using `gulp`).

### Build

```shell
$ npm run build
```

To build the project into the `dist/` directory (using `gulp`).
Sourcemaps are generated in order to be able to debug into VSCode (TS -> JS).

### Start

```shell
$ npm start
```

To start the API in dev mode.

**Note :** It uses `nodemon` in order to watch `dist/` changes that `gulp watch` is producing and reloads the API at each change it detects.

### Test

```shell
$ npm test
```

Will launch the tests from `tests/*` files.

## Configuration

The app is loading `config/` appropriate configuration file regarding `NODE_ENV` value.

By default, it loads `config/default.json`.

To change `NODE_ENV` value, the app uses `cross-env` package. That way, it will work with any OS you are working on.

See `package.json` for examples.

Default configuration file :

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
        // the appenders configuration file into config/log4js/
        "log4js-config": "default.json",
        // breaking-change if modified : this format is used by console logger AND api logger too (and parsed by logstash)
        "format": ":remote-addr - - [:date] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time"
    },
    "mongo": {
        "hostname": "127.0.0.1",
        "port": "27017",
        "db": "whiteapp-express-api-ts",
        "username": "",
        "password": ""
    },
    "tests": {
        "auth": {
            "login": "",
            "password": ""
        }
    }
}
```

- **server** : used for express settings mostly
- **jwt** : used for token generation settings (the secret is there for now but should not be in clear there)
- **logs** : important one, a [dedicated section](#logs) explains the logging system used
- **mongo** : mongodb configuration
- **tests** : dedicated to tests (see the `config/test.json` override)

All of these entries can be overridden in `config/<custom_env>.json` files, even partially like only `server.port`. See the other config files.

## Logs

As this app is supposed to be a white-api skeleton at the end, it's important to provide several options in order to log everything possible (depending on what is your goal or final setup).
In order to do that, `log4js` is a quite good solution. It provides some great options.

The configuration files are stored into `config/log4js` directory. To learn more about `appenders` and all that stuff, you should go to [official GitHub](https://github.com/nomiddlename/log4js-node) page, or several articles providing some useful examples [like this one](http://blog.maskalik.com/2015/10/01/log4js-http-request-parsing-with-logstash/).

Logger object (with appenders config in it) is given to express in order to log something everytime express is doing something.

Out of the box, supported log methods are :
- console logs
- ELK stack (see [docker sebp/elk](https://hub.docker.com/r/sebp/elk/) for example, very useful)

***

```json
"format": ":remote-addr - - [:date] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time"
```

***Important notice*** : the `logs.format` into general configuration files is in fact the output format for the logs (use for every types of logs, like console and logstash). A logstash filter can then read this line and reorganize it in order to record things into elasticsearch

***

The log4js configuration files are loaded regarding the `logs.log4js-config` field into general `config/` files. Help yourself ;o)

**TODO** : integrate ELK stack to the project and to the build pipeline [issue #14](https://gitlab.gjdass.fr/gjdass/whiteapi-express-api-ts/issues/14)

## Gulp

Gulp has 5 tasks configured :
- `build-ts` which triggers the `src/` TypeScript files transpilation with sourcemaps generation
- `build-assets` which triggers the `src/datas` JSON files copy to `dist/datas`
- `watch` which starts watching changes on TS and JSON files into `src/` and triggers builds when needed
- `default` which triggers `watch`
- `build` which triggers a single full build (without watching)

## CI with GitLab

The project uses Gitlab-CI in order to build and run tests. There is not so much to say. See the `gitlab-ci.yml` file.

## Datas storage

The final goal is to provide several ways to store datas with the API. The first example provided is Mongo but at the end, `sequelize` will help us to provide some other ways (SQL). It would be nice to let developers chose their best option.

It will be one of the next improvement. It must be well-written so it's gonna take time.

### MongoDB

The only way to store datas for now. Very basic implementation for now. Not perfect at all.

Configuration for mongo is available in `config/` env files.

***

To be continued.