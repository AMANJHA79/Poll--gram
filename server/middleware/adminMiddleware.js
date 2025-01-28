const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        
      return res.status(403).json({ error: "Access denied. Admin only." });
    }
    next();
  };
  
  module.exports = adminMiddleware;