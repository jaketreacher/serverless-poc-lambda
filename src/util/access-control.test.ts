import { APIGatewayProxyResult } from "aws-lambda";
import { assert, exception } from "console";
import { StatusCodes } from "http-status-codes";
import { ACCESS_CONTROL_HEADERS, withAccessControl } from "./access-control";

describe("access-control", () => {
  it("injects Access Control headers into response without headers", async () => {
    // Setup
    const response: APIGatewayProxyResult = {
      statusCode: StatusCodes.OK,
      body: "",
    };

    // Run
    const actual = await withAccessControl(() => Promise.resolve(response))();

    // Verify
    expect(actual.headers).toEqual(ACCESS_CONTROL_HEADERS);
    expect(actual.statusCode).toEqual(StatusCodes.OK);
    expect(actual.body).toEqual("");
  });

  it("injects Access Control headers into response with headers", async () => {
    // Setup
    const response: APIGatewayProxyResult = {
      statusCode: StatusCodes.OK,
      body: "",
      headers: {
        "Test-Header-1": "Test-1",
        "Test-Header-2": "Test-2",
      },
    };

    // Run
    const actual = await withAccessControl(async () => response)();

    // Verify
    const expected: APIGatewayProxyResult = {
      statusCode: StatusCodes.OK,
      body: "",
      headers: {
        "Test-Header-1": "Test-1",
        "Test-Header-2": "Test-2",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };

    expect(actual).toEqual(expected);
  });

  it("does nothing on void", async () => {
    // Run
    const actual = await withAccessControl(() => {})();

    // Verify
    expect(actual).toBeUndefined();
  });
});
