import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createResponse } from '../utils/response';
import mysql from 'mysql';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

interface Users {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export const listUser = async (
  event: APIGatewayProxyEvent,
  context: any,
  callback: any,
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('context', context);
    console.log('calback', callback);
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 0,
      password: '---',
      user: '---',
      database: '---',
    });

    connection.connect();
    const response = connection.query('SELECT * FROM gen.users', (err, res) => {
      console.log(err);
      if (err) throw err;
      callback(null, createResponse({ statusCode: 200, data: res }));
    });
    console.log('test', response);
    return createResponse({ statusCode: 200 });
  } catch (err: unknown) {
    return createResponse({
      statusCode: 500,
      data: {
        message: err instanceof Error ? err.message : 'some error happened',
      },
    });
  }
};
