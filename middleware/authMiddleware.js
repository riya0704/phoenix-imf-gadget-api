import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
// console.log('Authorization Header:', authHeader);
// console.log('Token Extracted:', token);
// console.log('JWT Secret:', process.env.JWT_SECRET);
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    console.error('JWT Error:', ex.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
  
}

