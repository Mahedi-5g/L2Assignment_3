import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err:any,
     req:Request,
      res:Response,
      next:NextFunction
    ) => {
  res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: err,
  });
};