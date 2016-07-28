import koa from 'koa'
import request from 'co-supertest'
import { expect } from 'chai'
import staticspa from '.'

/**
 * assertions for failure
 */
describe('failure tests', () => {
  it('should return 404 for correct path but invalid folder.', (done) => {
    const app = koa()
    app.use(staticspa({ folder: '/myfolder' }))
    request(app.listen())
    .get('/app')
    .expect(404)
    .end(done)
  })

  it('should return 404 for correct folder but invalid path', (done) => {
    const app = koa()
    app.use(staticspa({ folder: `${__dirname}/dist`, prefix: '/app' }))
    request(app.callback())
    .get('/app1')
    .expect(404)
    .end(done)
  })

  it('should return 404 for invalid path and default options', (done) => {
    const app = koa()
    app.use(staticspa())
    request(app.callback())
    .get('/app1')
    .expect(404)
    .end(done)
  })
})

/**
 * assertions for success
 */
describe('success tests', () => {
  it('should return 301 for valid prefix and valid folder.', (done) => {
    const app = koa()
    app.use(staticspa({ prefix: '/app' }))
    request(app.listen())
    .get('/app')
    .expect(301)
    .end(done)
  })

  it('should not redirect and respond with 200 for path "/app/".', (done) => {
    const app = koa()
    app.use(staticspa())
    request(app.listen())
    .get('/app/')
    .expect(200)
    .end(done)
  })

  it('should not redirect and respond with 200 for valid path and any subpath "/app/anysubpath" for "text/html" requests.', (done) => {
    const app = koa()
    app.use(staticspa())
    request(app.listen())
    .get('/app/anysubpath')
    .set('Accept', 'text/html')
    .expect(200)
    .end(done)
  })

  it('should redirect once, then respond with body "contents of index.html\n" and status 200.', (done) => {
    const app = koa()
    app.use(staticspa())
    request(app.listen())
    .get('/app')
    .redirects(1)
    .expect(200)
    .expect('contents of index.html\n')
    .end(done)
  })
})
