module.exports.checkSession = (req, res, next) => {
    const sess = req.session.username
    if( sess ){
        console.log(sess);
        next();
    }
    else{
        return res.status(401).json({ message : "Need to Login, Try again after login" });
    }
}



// write board or picture
// localhost:3000/board/:name
module.exports.checkWriter = (req, res, next) => {
    const sess = req.session
    if( sess.name == req.params.name )
        next()
    
    else
        return res.status(401).json({error: 'Auth Fail'})
}