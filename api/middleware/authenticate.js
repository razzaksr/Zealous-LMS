const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign the user information from the token to the request
    req.user = decoded.user;
    
    // Call the next middleware function in the stack
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticate;
