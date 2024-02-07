import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  const user = await User.findById(req.user?._id);
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: sortBy
      ? { [sortBy]: sortType === "asc" ? 1 : -1 }
      : { createdAt: -1 },
  };

  if (!(user || userId)) {
    throw new ApiError(404, "User Id not valid");
  }

  if (!query) {
    throw new ApiError(404, "Please provide query");
  }

  const aggrequery = await Video.aggregate([
    {
      $match: {
        title: query?.title,
      },
    },
  ]);
  const getVideo = await Video.aggregatePaginate(aggrequery, options);

  res
    .status(200)
    .json(new ApiResponse(200, getVideo, "Video fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  //TODO: get video, upload to cloudinary, create video
  const videoFilePath = req.files?.path;
  const thumbnailFilePath = req.files?.path;
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
