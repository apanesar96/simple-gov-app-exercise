const AWS = require('aws-sdk');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

const { SUBJECT_TABLE } = process.env;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/:subject', async (req, res) => {
  const { params: { subject } } = req;
  const params = {
    TableName: SUBJECT_TABLE,
    Key: {
      title: subject,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const {
        title, firstName, lastName, age, maidenName,
      } = Item;
      res.json({
        title, firstName, lastName, age, maidenName,
      });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "title"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retreive user' });
  }
});

app.post('/:subject', async (req, res) => {
  const { params: { subject } } = req;
  const {
    firstName, lastName, age, maidenName,
  } = req.body;
  if (typeof firstName !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: SUBJECT_TABLE,
    Item: {
      title: subject,
      firstName,
      lastName,
      age,
      maidenName,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      title: subject, firstName, lastName, age, maidenName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

module.exports.handler = serverless(app);
