const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAllCocktails() {
   const params = {
      TableName: 'cocktails',
   };
   const data = await dynamoDB.scan(params).promise();
   return data.Items;
}

exports.handler = async (event) => {
   const recipes = await getAllCocktails();

   const response = {
      statusCode: 200,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify(recipes),
   };
   return response;
};
