const jwt= require('jsonwebtoken');
const JWT_SECRET = "ibox_2389jklsjdjf%#@jlk";
const fetchUser= (req,res,next)=>{
    // Get the user from the jwt toden and add id to req object
    const token= req.header('authToken');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const data=jwt.verify(token, JWT_SECRET);
        req.user= data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});    }
  
}
module.exports = fetchUser;