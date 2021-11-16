const AWS = require('aws-sdk');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

const { SUBJECT_TABLE } = process.env;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/subject', async (req, res) => {
  const params = {
    TableName: SUBJECT_TABLE,
    Key: {
      userId: '1',
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const {
        userId, firstName, lastName, age,
      } = Item;
      res.json({
        userId, firstName, lastName, age,
      });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retreive user' });
  }
});

app.post('/subject', async (req, res) => {
  const {
    firstName, lastname, age,
  } = req.body;
  if (typeof firstName !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: SUBJECT_TABLE,
    Item: {
      userId: '1',
      firstName,
      lastname,
      age,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      userId: '1', firstName, lastname, age,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

app.get('/mother', async (req, res) => {
  const params = {
    TableName: SUBJECT_TABLE,
    Key: {
      userId: '1',
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    console.dir(Item);
    if (Item) {
      const {
        mother: {
          firstName, lastName, maidenName, age,
        },
      } = Item;
      res.json({
        firstName, lastName, maidenName, age,
      });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retreive user' });
  }
});

app.post('/mother', async (req, res) => {
  const {
    firstName, lastname, maidenName, age,
  } = req.body;
  if (typeof firstName !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: SUBJECT_TABLE,
    Key: {
      userId: '1',
    },
    UpdateExpression: 'set mother = :m',
    ExpressionAttributeValues: {
      ':m': {
        firstName,
        lastname,
        maidenName,
        age,
      },
    },
    ReturnValues: 'UPDATED_NEW',
  };

  // const params = {
  //   TableName: SUBJECT_TABLE,
  //   Key: {
  //     userId: '1',
  //   },
  //   Item: {
  //     mother: {
  //       firstName,
  //       lastname,
  //       maidenName,
  //       age,
  //     },
  //   },
  // };

  try {
    await dynamoDbClient.update(params).promise();
    res.json({
      firstName, lastname, maidenName, age,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create Mother user' });
  }
});

// app.use((req, res, next) => res.status(404).json({
//   error: 'Not Found',
// }));

module.exports.handler = serverless(app);
