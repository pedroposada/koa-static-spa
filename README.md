# Koa middleware to serve a Single Page App

The main purpose of this middleware is to support url rewriting for Single Page Apps that have a router.
It creates a new endpoint in your koa app.
This new endpoint serves files from a configurable directory, default value is `/app`.
If you have an SPA that has a router, for example a React app that uses react-router,
and your app has a path lets say `/terms`, if you refresh the browser's window,
your app will display the homepage but you really would like it to display the `Terms` page.
This middleware solves that for you, it will rewrite all paths to `/index.html` by default.
It hands over the control of the pages to your SPA's router after a hard browser's refresh.

## Requirements
[koa 1.x](https://github.com/koajs/koa/tree/1.2.1)

## Installation

```bash
$ npm install koa-static-spa
```

## Options

 - `folder` Folder with files to serve, defaults to "/app"
 - `prefix` All paths will be prefixed with this value. Defaults to "/app"
 - Plus all [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) options
 - Plus all [koa-static](https://github.com/koajs/static) options

## Example

```js
import koa from 'koa'
import staticspa from 'koa-static-spa'
const app = koa()

// use defaults
app.use(servespa())

// folder "/myapp" and path "/content"
app.use(staticspa({ folder: '/myapp', prefix: '/content' }))

// or use absolute folder paths
app.use(staticspa({ folder: `${__dirname}/test/fixtures` }))

app.listen(3000)

console.log('listening on port 3000');
```
## Test
```bash
$ npm test
```
