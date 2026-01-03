//const sessionIdToUserMap=new Map();

const jwt =require("jsonwebtoken");
const secret="neha";



function setUser(user){
  
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
            role:user.role
        },
        secret
    )

}


// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);

// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);

// }

function getUser(token){
    if(!token)return null;
    return jwt.verify(token,secret);

}

module.exports={
    setUser,
    getUser
}