const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
var http = require('http');

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.NODE_ENV !== 'production' ? 'localhost' : 'joinmetagig.vercel.app'
const port = process.env.PORT || 5000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var message = 'It works!\n',
      version = 'NodeJS ' + process.versions.node + '\n',
      response = [message, version].join('\n');
  res.end(response);
});
server.listen(); 