const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = { // urls routed in here, go to here see if route exists
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBad,
  '/unauthorized': jsonHandler.getNotAllowed,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImplemented,
  notFound: jsonHandler.notFound,
  /* HEAD: {
    notFound: jsonHandler.notFoundMeta,
    '/success': jsonHandler.getSuccessMeta,
    '/badRequest': jsonHandler.getBadMeta,
    '/unauthorized': jsonHandler.getNotAllowedMeta,
    '/forbidden': jsonHandler.getForbiddenMeta,
    '/internal': jsonHandler.getInternalMeta,
    '/notImplemented': jsonHandler.getNotImplementedMeta,
  }, */

};

// sends url to handlers
//ok for future celeste u have to make everything do head/get. 
//took it out bcuz u was going crazy aaa goin stupid aaaa
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = parsedUrl.query;

  if (urlStruct[parsedUrl.pathname]) {
    if (params) {
      urlStruct[parsedUrl.pathname](request, response, params);
    } else {
      urlStruct[parsedUrl.pathname](request, response);
    }
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
