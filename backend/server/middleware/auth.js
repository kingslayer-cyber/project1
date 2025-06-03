import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check for restaurant role
export const restaurantOnly = (req, res, next) => {
  auth(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      
      if (user.role !== 'restaurant' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Restaurant or admin access required.' });
      }
      
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

// Check for admin role
export const adminOnly = (req, res, next) => {
  auth(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin access required.' });
      }
      
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};