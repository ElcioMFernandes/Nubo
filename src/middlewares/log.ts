import { Request, Response, NextFunction } from "express";

export function log_middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, url } = req;
    const { statusCode } = res;
    const ip = req.ip;

    console.log(`[${method}] ${statusCode} - ${ip}${url} - ${duration}ms`);
  });
  next();
}
