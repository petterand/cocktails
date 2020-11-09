const AWS = require('aws-sdk');
const APIGATEWAY = new AWS.APIGateway();

exports.handler = async (event) => {
   let headers = event.headers;

   const authorizationHeader = headers.Authorization;

   if (!authorizationHeader) return { statusCode: 401, body: '1' };

   const encodedCreds = authorizationHeader.split(' ')[1];

   if (encodedCreds !== process.env.AUTH) {
      return { statusCode: 401 };
   }

   const plainCreds = Buffer.from(encodedCreds, 'base64').toString().split(':');
   const username = plainCreds[0];

   const params = { includeValues: true, limit: 10 };
   const keys = await APIGATEWAY.getApiKeys(params).promise();
   const keyItem = keys.items.find((item) => item.name === username);
   const key = keyItem.value;

   const body = {
      username,
      key,
   };

   const response = {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
   };
   return response;
};
