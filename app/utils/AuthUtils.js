function AuthUtil() {

}

AuthUtil.prototype.verifyAuthMiddleware = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {

        next();
        // jwtUtil.verifyToken(token, function (err, decoded) {
        //     if (err) {
        //         return res.status(401).send('Failed to authenticate token.');
        //     } else {
        //         req.session = decoded;
               
        //     }
        // });
    } else {
        next();
    
    }
}

module.exports = AuthUtil;