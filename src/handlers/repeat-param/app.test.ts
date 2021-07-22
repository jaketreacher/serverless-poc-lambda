import { APIGatewayProxyEvent } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { ACCESS_CONTROL_HEADERS } from "../../util/access-control";
import { handler } from "./app";

describe("repeat-param", () => {
  let mockEvent: APIGatewayProxyEvent;

  beforeEach(() => {
    mockEvent = {
      body: JSON.stringify({
        text: "test",
      }),
    } as APIGatewayProxyEvent;
  });

  it("returns 200", async () => {
    const actual = await handler(mockEvent);

    expect(actual.statusCode).toEqual(StatusCodes.OK);
  });

  it("returns `test`", async () => {
    const actual = await handler(mockEvent);

    expect(actual.body).toEqual("test");
  });

  it("has Access Control", async () => {
    const actual = await handler(mockEvent);

    Object.keys(ACCESS_CONTROL_HEADERS).forEach((header: string) => {
      expect(Object.keys(actual.headers!)).toContain(header);
    });
  });

  it("returns 400 when no body provided", async () => {
    mockEvent = {} as APIGatewayProxyEvent;

    const actual = await handler(mockEvent);

    expect(actual.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(actual.body).toBe("No body provided.");
  });
});
