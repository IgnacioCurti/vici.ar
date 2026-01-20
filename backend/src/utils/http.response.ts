import type { Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCode.js";

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(STATUS_CODES.OK).json({
      status: STATUS_CODES.OK,
      statusMsg: "Success",
      data: data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: STATUS_CODES.NOT_FOUND,
      statusMsg: "Not Found",
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: STATUS_CODES.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      status: STATUS_CODES.FORBIDDEN,
      statusMsg: "Forbidden",
      error: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      error: data,
    });
  }
}
