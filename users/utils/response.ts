type Body = {
  message?: string;
  data?: object | object[] | any;
};

interface ResponseOptions extends Partial<Body> {
  statusCode: number;
}

class Response {
  statusCode: number;
  body: string;

  constructor({ statusCode = 200, message, data }: ResponseOptions) {
    this.statusCode = statusCode;
    this.body = '';
    if (message || data) {
      this.body = JSON.stringify({
        ...(message && { message }),
        ...(data && { data }),
      });
    }
  }
}

function createResponse({ statusCode, message, data }: ResponseOptions) {
  return new Response({ statusCode, message, data });
}

export { createResponse };
