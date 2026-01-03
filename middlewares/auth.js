const {getUser}=require("../service/auth");



function checkForAuthentication(req,res,next){
//    const authorizationHeaderValue=req.headers["authorization"];

const tokenCookie=req.cookies?.token;
    req.user=null;
    // if( !authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ") )
    //     return next();
    // const token=authorizationHeaderValue.split("Bearer ")[1];

    if(!tokenCookie)return next();
    const token=tokenCookie;
    const user=getUser(token);
    req.user=user;
     return next();
}
// async function restrictToLoggedinUsersOnly(req,res,next){
//     const userUid=req.cookies?.uid;
//     if(!userUid) return res.redirect("/login");
//     const user=getUser(userUid);

//     if(!user)return res.redirect("/login")
//         req.user=user;
//     next();
     


// }


// async function checkAuth(req,res,next){
//     const userUid=req.cookies?.uid;

//     const user=getUser(userUid);

//     req.user=user;
//     next();

// }


function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login");

        if(!roles.includes(req.user.role))return res.end("Unauthorized");
        return next();
    }
}


module.exports={
//     restrictToLoggedinUsersOnly,
//     checkAuth
checkForAuthentication,
    restrictTo
}

