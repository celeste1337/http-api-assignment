const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = { // urls routed in here, go to here see if route exists
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.getSuccess,
    '/badRequest': jsonHandler.getBad,
    '/unauthorized': jsonHandler.getNotAllowed,
    '/forbidden': jsonHandler.getForbidden,
    '/internal': jsonHandler.getInternal,
    '/notImplemented': jsonHandler.getNotImplemented,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    notFound: jsonHandler.notFoundMeta,
    '/success': jsonHandler.getSuccessMeta,
    '/badRequest': jsonHandler.getBadMeta,
    '/unauthorized': jsonHandler.getNotAllowedMeta,
    '/forbidden': jsonHandler.getForbiddenMeta,
    '/internal': jsonHandler.getInternalMeta,
    '/notImplemented': jsonHandler.getNotImplementedMeta,
  },

};

// sends url to handlers
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(request.method);
  console.dir(parsedUrl.pathname);
  if (parsedUrl.query) {
    console.dir(parsedUrl.query);
  }

  if (!urlStruct[request.method]) {
    urlStruct.HEAD.notFound(request, response);
  }

  // returns entire object w the 2 routes in it, index into it w the pathname
  if (urlStruct[request.method][parsedUrl.pathname]) {
    //if it has parameters???????????????????
    if (parsedUrl.query) {
      urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl.query);
    } else {
      urlStruct[request.method][parsedUrl.pathname](request, response);
    }
  } else { // doesnt check for post, only get
    urlStruct[request.method].notFound(request, response);
  }
};


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
