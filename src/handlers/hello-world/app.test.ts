import { StatusCodes } from "http-status-codes";
import { ACCESS_CONTROL_HEADERS } from "../../util/access-control";
import { handler } from "./app";

describe("hello-world", () => {
  it("returns 200", async () => {
    const actual = await handler();

    expect(actual.statusCode).toEqual(StatusCodes.OK);
  });

  it("returns `Hello world!`", async () => {
    const actual = await handler();

    expect(actual.body).toEqual("Hello world!");
  });

  it("has Access Control", async () => {
    const actual = await handler();

    Object.keys(ACCESS_CONTROL_HEADERS).forEach((header: string) => {
      expect(Object.keys(actual.headers!)).toContain(header);
    });
  });
});
