const AWS = require('aws-sdk');
const crypto = require('crypto');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const generateId = () => crypto.randomBytes(16).toString('hex');

exports.handler = async (event) => {
   const body = JSON.parse(event.body);

   if (body.name && body.ingredients) {
      const params = {
         TableName: 'cocktails',
         Item: {
            id: generateId(),
            ...body,
         },
      };

      try {
         await dynamoDb.put(params).promise();
         return { statusCode: 200 };
      } catch (e) {
         return {
            statusCode: 500,
            body: JSON.stringify(e),
         };
      }
   } else {
      return {
         statusCode: 400,
      };
   }
};
