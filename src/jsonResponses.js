
// RESPOND QUIRKY GORL
const respondJSON = (request, response, status, object, type) => {
  const headers = {
    'Content-Type': type,
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <code> ${object.id} </code>`;
    responseXML = `${responseXML} <msg> ${object.message} </msg>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(status, headers);
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
  }
};

const respondJSONMeta = (request, response, status, type) => {
  const headers = {
    'Content-Type': type,
  };

  response.writeHead(status, headers);
  response.end();
};

// 404 NOT FOUND
const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON, type);
};

const notFoundMeta = (request, response, type) => respondJSONMeta(request, response, 404, type);

// needs a success one - 200
const getSuccess = (request, response, type) => {
  const responseJSON = {
    message: 'Successful request. Welcome!',
    id: 'success',
  };

  return respondJSON(request, response, 200, responseJSON, type);
};

const getSuccessMeta = (request, response, type) => respondJSONMeta(request, response, 200, type);

// needs a bad request one - 400
const getBad = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required params :)',
    id: 'goodRequest',
  };
  if (!params || params !== 'valid=true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON, type);
  }
  return respondJSON(request, response, 200, responseJSON, type);
};

const getBadMeta = (request, response, type) => respondJSONMeta(request, response, 200, type);

// needs unauthorized - 401
const getNotAllowed = (request, response, type, params) => {
  const responseJSON = {
    message: 'Welcome!! Successful request',
    id: 'success',
  };

  if (!params || params !== 'loggedIn=yes') {
    responseJSON.message = 'Missing valid query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON, type);
  }

  return respondJSON(request, response, 200, responseJSON, type);
};

// const getNotAllowedMeta = (request, response, type) =>
// respondJSONMeta(request, response, 401, type);

// needs forbidden - 403
const getForbidden = (request, response, type) => {
  const responseJSON = {
    message: 'Forbidden request.',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON, type);
};

const getForbiddenMeta = (request, response, type) => respondJSONMeta(request, response, 403, type);

// needs internal error - 500
const getInternal = (request, response, type) => {
  const responseJSON = {
    message: 'There\'s an internal error!!',
    id: 'internalError',
  };

  return respondJSON(request, response, 500, responseJSON, type);
};

const getInternalMeta = (request, response, type) => respondJSONMeta(request, response, 500, type);

// needs not implemented - 501
const getNotImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'We didnt make this yet',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON, type);
};

// const getNotImplementedMeta = (request, response, type) =>
// respondJSONMeta(request, response, 501, type);

// 404 one is done :)

module.exports = {
  notFound,
  notFoundMeta,
  getSuccess,
  getSuccessMeta,
  getBad,
  getBadMeta,
  getNotAllowed,
  // getNotAllowedMeta,
  getForbidden,
  getForbiddenMeta,
  getInternal,
  getInternalMeta,
  getNotImplemented,
  // getNotImplementedMeta,
};
