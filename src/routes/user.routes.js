import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { varifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(varifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(varifyJWT, changeCurrentPassword);
router.route("/current-user").get(varifyJWT, getCurrentUser);
router.route("/update-account").patch(varifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(varifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(varifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/:username").get(varifyJWT, getUserChannelProfile);
router.route("/history").get(varifyJWT, getWatchHistory);
//http://localhost:/api/v1/users/register
export default router;
