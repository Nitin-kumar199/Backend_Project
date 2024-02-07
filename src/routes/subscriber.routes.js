import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscriber.controller.js";
import { varifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(varifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/c/:channelId")
  .get(getSubscribedChannels)
  .post(toggleSubscription);

router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router;
