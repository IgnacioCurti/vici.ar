import type { Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCode.js";

export class HttpResponse {
  Ok<T>(res: Response, message = "Success", data?: T): Response {
    return res.status(STATUS_CODES.OK).json({
      status: STATUS_CODES.OK,
      message,
      data,
    });
  }

  NotFound(res: Response, message = "Not found"): Response {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: STATUS_CODES.NOT_FOUND,
      message,
    });
  }

  Unauthorized(res: Response, message = "Unauthorized"): Response {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: STATUS_CODES.UNAUTHORIZED,
      message,
    });
  }

  Forbidden(res: Response, message = "Forbidden"): Response {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      status: STATUS_CODES.FORBIDDEN,
      message,
    });
  }

  Error(res: Response, message = "Internal server error"): Response {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message,
    });
  }

  BadRequest(res: Response, message = "Bad request"): Response {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: STATUS_CODES.BAD_REQUEST,
      message,
    });
  }
}
