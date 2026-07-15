import {asyncHandler} from '../utils/asyncHandler.js'
import{ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req,res) => {
   //get user details from frontend
   // validation - not empty 
   //check if user already exists: username , email
   // check images , check for avatar
   // upload them to cloudinary , avatar
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check for user creation
   // return response

  const {fullName , email , username, password} = req.body
console.log("email : ",email , "username:",username)


//first way to validate
//   if(fullName === ""){
//     throw new ApiError(400 , "Full Name is required")
//   }

// Second Way to validate
if(
    [fullName , email , username , password].some((field) =>
    !field || field?.trim() === "")
){
    throw new ApiError (400 , "All Fields are required")
}

const existedUser = await User.findOne({
    $or:[{ username }, { email } ]
})

if(existedUser){
    throw new ApiError(409 , "User With email or username already exists")
}

 const avatarLocalPath = req.files?.avatar[0]?.path;

 const coverImageLocalPath = req.files?.coverImage[0]?.path;


if(!avatarLocalPath){
    throw new ApiError(400 , "Avator file is required")

}

const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)


if(!avatar){
        throw new ApiError(400 , "Avator file is required")

}

const user = await  User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // this both fields will not come 
)

if(!createdUser){
    throw new ApiError(500 , "Something went wrong while registring the user")
}


return res.status(201).json(
    new ApiResponse(200,createdUser , "User registred Successfully")
)

})



export {registerUser}