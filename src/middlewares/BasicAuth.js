module.exports = (req, res, next) => {
    if(req.headers.authorization == process.env.BASIC_API_KEY){
        next()
    }else{
        res.status(403).json({error:"Unauthorised"})
    }
 };