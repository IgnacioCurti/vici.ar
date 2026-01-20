import type { Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCode.js";

export class HttpResponse {
  Ok(res: Response, message?: string, data?: any): Response {
    return res.status(STATUS_CODES.OK).json({
      status: STATUS_CODES.OK,
      statusMsg: message && "Success",
      data: data,
    });
  }

  NotFound(res: Response, message?: string, data?: any): Response {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: STATUS_CODES.NOT_FOUND,
      statusMsg: message && "Not Found",
      error: data,
    });
  }

  Unauthorized(res: Response, message?: string, data?: any): Response {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: STATUS_CODES.UNAUTHORIZED,
      statusMsg: message && 'Unauthorized',
      error: data,
    });
  }

  Forbidden(res: Response, message?: string, data?: any): Response {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      status: STATUS_CODES.FORBIDDEN,
      statusMsg: message && "Forbidden",
      error: data,
    });
  }

  Error(res: Response, message?: string, data?: any): Response {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      statusMsg: message && "Internal server error",
      error: data,
    });
  }
}
