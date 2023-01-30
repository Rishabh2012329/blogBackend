const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, 'secretkey');
        req.userData = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
      }
}