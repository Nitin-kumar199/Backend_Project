import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields Required");
  }
  const exitedUser = User.findOne({
    $or: [username, email],
  });
  if (exitedUser) {
    throw new ApiError(409, "Username and email already exited");
  }
  const avatarImageLocalPath = req.files?.avatar[0].path; //req.files this files we are getting from multer
  const coverImageLocalPath = req.files?.coverImage[0].path;
  if (!avatarImageLocalPath) {
    throw new ApiError(400, "Avatar field required");
  }
  const avatar = await uploadOnCloudinary(avatarImageLocalPath);
  const coverImg = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Error while uploading on cloudinary");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImg?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
