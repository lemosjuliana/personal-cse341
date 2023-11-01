const authenticate = (req, res, next) => {
    // Check if user is authenticated
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    next();
  };
  
  module.exports = authenticate;
  