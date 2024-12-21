import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken'; // For TypeScript type declarations

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string; // Add userId to the request object
}

export const authenticateUser = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.userId; // Add the userId to the request object
    next(); // Proceed to the next middleware or handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
