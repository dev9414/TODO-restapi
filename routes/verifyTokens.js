const jwt= require('jsonwebtoken');

exports.verify= (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied");
    
    try{
        const verified = jwt.verify(token, "fdRGEGREG");
        req.user=verified;
        next();
    }
    catch(err){
        req.status(400).send("Invalid Token");
    }
}
