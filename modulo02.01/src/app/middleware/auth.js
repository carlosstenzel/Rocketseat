import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeaader = req.headers.authorization;

  if (!authHeaader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeaader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    //jwt.destroy(token);
    req.userId = decoded.id;

    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};