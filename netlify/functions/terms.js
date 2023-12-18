const data = require('../../data/db.json');

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};