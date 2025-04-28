import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Read token from cookie
  const token = req.cookies?.token;
  console.log(`The token is ${token}`);
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(`The decoded token is ${decoded}`);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}; 