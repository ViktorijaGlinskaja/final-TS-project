const seekerMiddleware = (req, res, next) => {
    if (req.user.role !== 'SEEKER') {
      res.status(403).json({
        message: 'You must be a content seeker to acceess request'
      });
      return;
    }
  
    next();
  };
  
export default seekerMiddleware;