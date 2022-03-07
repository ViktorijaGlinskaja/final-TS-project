const Middleware = (req, res, next) => {
    if (req.user.role !== 'CREATOR') {
      res.status(403).json({
        message: 'You must be a content creator to acceess request'
      });
      return;
    }
  
    next();
  };
  
export default creatorMiddleware;