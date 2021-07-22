import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { withAccessControl } from "../../util/access-control";

const _handler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: StatusCodes.OK,
    body: "Hello world!",
  };
};

export const handler = withAccessControl(_handler);
