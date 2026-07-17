import {Router} from 'express'
import{ registerUser , loginUser, logoutUser , refreshAccessToken, changeCurrentPassword, getCurrentUser, updatedAccountDetails, updatedUserAvatar, updatedUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.controller.js"
import {upload} from '../middlewares/multer.middleware.js'
import { veryfyJWT } from '../middlewares/auth.middleware.js'


const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        } ,
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
registerUser
)


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(veryfyJWT , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(veryfyJWT,changeCurrentPassword)
router.route("/current-user").get(veryfyJWT,getCurrentUser)
router.route("/update-account").patch(veryfyJWT,updatedAccountDetails)

router.route("/avatar").patch(veryfyJWT,upload.single("avatar"),updatedUserAvatar)
router.route("/cover-image").patch(veryfyJWT,upload.single("/coverImage")),updatedUserCoverImage
router.route("/c/:username").get(veryfyJWT,getUserChannelProfile)
router.route("/history").get(veryfyJWT,getWatchHistory)

export default router