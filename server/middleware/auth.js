const jwt = require("jsonwebtoken");
const config = require("config");

//只要有用到auth middleware的 都會回傳一個user id 假設在jwt.verify有通過的話
module.exports = function(req,res,next){
    //Get token from header
    const token = req.header("x-auth-token");
    //Check if not token
    if(!token) return res.status(401).json({msg : "No token, authorzation denied"});

    //Verify token
    try{
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        // console.log(decoded);
        req.user = decoded.user;
        // console.log(req.user); { id : "xxxxxxx"}
        next();
    }catch(err){
        res.status(401).json({msg : "Token is not valid"});
    }
}