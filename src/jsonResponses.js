// RESPOND QUIRKY GORL
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// 404 NOT FOUND
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// needs a success one - 200
const getSuccess = (request, response) => {
  const responseJSON = {
    message: 'Ah... weary traveller... Ive been expecting you',
    id: 'success',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getSuccessMeta = (request, response) => respondJSONMeta(request, response, 200);

// needs a bad request one - 400
const getBad = (request, response) => {
  const responseJSON = {
    message: 'your request sucks and was rejected!!!!!!',
    id: 'badRequest',
  };

  return respondJSON(request, response, 400, responseJSON);
};

const getBadMeta = (request, response) => respondJSONMeta(request, response, 400);

// needs unauthorized - 401
const getNotAllowed = (request, response) => {
  const responseJSON = {
    message: 'your request sucks and was rejected!!!!!! get rekt LOLLLL',
    id: 'unauthorized',
  };

  return respondJSON(request, response, 401, responseJSON);
};

const getNotAllowedMeta = (request, response) => respondJSONMeta(request, response, 401);

// needs forbidden - 403
const getForbidden = (request, response) => {
  const responseJSON = {
    message: 'idk what ur trying to do but u WONT be doing it bc it is FORBIDDEN',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

const getForbiddenMeta = (request, response) => respondJSONMeta(request, response, 403);

// needs internal error - 500
const getInternal = (request, response) => {
  const responseJSON = {
    message: 'something went wrong oopsie',
    id: 'internalError',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const getInternalMeta = (request, response) => respondJSONMeta(request, response, 500);

// needs not implemented - 501
const getNotImplemented = (request, response) => {
  const responseJSON = {
    message: 'we didnt make this yet',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

const getNotImplementedMeta = (request, response) => respondJSONMeta(request, response, 501);

// 404 one is done :)

module.exports = {
  notFound,
  notFoundMeta,
  getSuccess,
  getSuccessMeta,
  getBad,
  getBadMeta,
  getNotAllowed,
  getNotAllowedMeta,
  getForbidden,
  getForbiddenMeta,
  getInternal,
  getInternalMeta,
  getNotImplemented,
  getNotImplementedMeta,
};
