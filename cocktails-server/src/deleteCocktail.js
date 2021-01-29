const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   const id = event.pathParameters.id;
   if (!id) {
      return {
         statusCode: 400,
         body: 'Missing id',
      };
   }
   try {
      const params = {
         TableName: 'cocktails',
         Key: {
            id: id,
         },
      };
      await dynamoDb.delete(params).promise();
      return {
         statusCode: 200,
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
         },
      };
   } catch (e) {
      return {
         statusCode: 500,
         body: 'Failed to delete item ' + id,
      };
   }
};
