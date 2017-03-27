## Node API in TypeScript

This is a white-app designed to start a node ExpressJS API using TypeScript.
You can clone it and start to build your own API.

### Quick start

#### Install global dependencies

`npm install -g mocha nodemon`

Mocha for tests and Nodemon for tracking changes in `dist/` directory and keep the API up-to-date and running.

#### Install local dependencies

`npm install`

#### Build

`gulp`

To build the project into the `dist/` directory and watching for changes in `src/` directorty.

See the `gulpfile.js` for more informations about commands.

#### Test

`npm test`

Will launch (with Mocha) the tests in `tests/` directory.