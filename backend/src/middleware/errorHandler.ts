import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('🚨 Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (error.message.includes('API key')) {
    statusCode = 500;
    message = 'Service configuration error';
  } else if (error.message.includes('blockchain') || error.message.includes('transaction')) {
    statusCode = 502;
    message = 'Blockchain service error';
  } else if (error.message.includes('IPFS') || error.message.includes('upload')) {
    statusCode = 502;
    message = 'Storage service error';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      details: error.message,
      stack: error.stack
    })
  });
}
