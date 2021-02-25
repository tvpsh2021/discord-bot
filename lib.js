function response({ statusCode = 200, message = '' }) {
  return {
    statusCode,
    message
  };
}

module.exports = {
  response
};
