import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getRecommendedUsers , getMyFriends , sendFriendRequest , acceptFriendRequest , getFriendRequests , getOutgoingFriendReqs} from "../controllers/userController.js";

const router = express.Router();

router.use(protectRoute);
router.get("/", getRecommendedUsers)
router.get("/friends", getMyFriends)

router.post("/friend-requests/:id" , sendFriendRequest);
router.put("/friend-requests/:id/accept" , acceptFriendRequest);

router.get("/friend-requests" , getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;