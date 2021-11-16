const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getSubjectData = async (event, context, callback) => {
  const { pathParameters: { title } } = event;
  const { env: { SUBJECT_TABLE: TableName } } = process;

  const params = {
    TableName,
    Key: {
      title,
    },
  };

  try {
    const { Item } = await dynamoDb.get(params).promise();

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
      body: 'Couldn\'t fetch user',
    });
  }
};
