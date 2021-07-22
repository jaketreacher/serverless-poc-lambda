import { APIGatewayProxyHandler } from "aws-lambda";

export const ACCESS_CONTROL_HEADERS: Record<string, any> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const withAccessControl = <H extends APIGatewayProxyHandler>(
  handler: H
) => {
  return (async (...args) => {
    return handler(...args)?.then((response) => {
      const headers = {
        ...response.headers,
        ...ACCESS_CONTROL_HEADERS,
      };

      return {
        ...response,
        headers,
      };
    });
  }) as H;
};
