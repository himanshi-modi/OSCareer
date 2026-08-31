const jwt=require("jsonwebtoken");

const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            userId:user._id,
            email:user.email
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn:process.env.JWT_ACCESS_EXPIRES_IN
        }
    )
}

const generateRefreshToken=(user)=>{
    return jwt.sign({
        userId:user._id,
    }, 
    process.env.JWT_REFRESH_SECRET,
    {
        expiresIn:process.env.JWT_REFRESH_EXPIRES_IN
    }
)
    
}
// {
//     "success": true,
//     "message": "Login successfully.",
//     "data": {
//         "user": {
//             "id": "6a5393a77623c1165803bc51",
//             "name": "deepti",
//             "username": "deepi12",
//             "email": "himanshimodi121@gmail.com"
//         },
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTUzOTNhNzc2MjNjMTE2NTgwM2JjNTEiLCJlbWFpbCI6ImhpbWFuc2hpbW9kaTEyMUBnbWFpbC5jb20iLCJpYXQiOjE3ODM4NjU3MDQsImV4cCI6MTc4Mzg2NjYwNH0.gH2eXz4q1u6Z5hXdtuyaJQCGpC5DHqc4FeV1-VLOxkE",
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTUzOTNhNzc2MjNjMTE2NTgwM2JjNTEiLCJpYXQiOjE3ODM4NjU3MDQsImV4cCI6MTc4NjQ1NzcwNH0.JLurT9xE6klIsiWtCKYMXxhqQk9IRYBPDuinIclo8Z4"
//     }
// }
module.exports={generateAccessToken,generateRefreshToken};