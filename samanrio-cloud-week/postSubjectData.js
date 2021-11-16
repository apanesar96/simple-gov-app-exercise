const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.saveSubjectData = async (event, context, callback) => {
  const { pathParameters: { title } } = event;
  const { env: { SUBJECT_TABLE: TableName } } = process;
  const { body } = event;
  const payload = JSON.parse(body);

  const params = {
    TableName,
    Item: {
      title,
      ...payload,
    },
  };

  try {
    const { Item } = await dynamoDb.put(params).promise();

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(Item),
    };

    callback(null, response);
  } catch (error) {
    console.error(error);

    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t post user',
    });
  }
};
