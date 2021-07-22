import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { withAccessControl } from "../../util/access-control";

type DataType = {
  text: string;
};

const _handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: "No body provided.",
    };
  }

  const data: DataType = JSON.parse(event.body);

  const { text } = data;

  return {
    statusCode: StatusCodes.OK,
    body: text,
  };
};

export const handler = withAccessControl(_handler);
