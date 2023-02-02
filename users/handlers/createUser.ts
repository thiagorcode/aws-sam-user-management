import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error('Need body!');

    const body = JSON.parse(event.body);
    return {
      body: JSON.stringify({
        users: body,
      }),
      statusCode: 200,
    };
  } catch (err: unknown) {
    return {
      body: JSON.stringify({
        message: err instanceof Error ? err.message : 'some error happened',
      }),
      statusCode: 500,
    };
  }
};
