import FriendRequest from "../models/friendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, //exclude current user id 
                { _id: { $nin: currentUser.friends } }, //exclude current user friends
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedUsers)
    } catch (err) {
        console.error("Error in getRecommendedUSers controller", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends);
    } catch (err) {
        console.error("Error in getMyFreinds Controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {

        const myId = req.user.id;
        const { id: recipientId } = req.params;

        //prevent sending request to yourself
        if (myId === recipientId) {
            return res.status(400).json({ message: "Cannot send friend request to yourself" })
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        //check if user already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        //check if req already exist/send
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exist between you and user" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(201).json(friendRequest)

    } catch (err) {
        console.error("Error in sending friend request", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (friendRequest.recipient.toString() != req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //add each user to the other's friends array
        //$addtoset adds an element to array only if they do no exist 
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        })

        res.status(200).json({ message: "Friend request accepted" });

    } catch (err) {
        console.log("Error in acceptFriendRequest controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient : req.user.id,
            status: "pending" 
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient" , "fullName profilePic")

        res.status(200).json({incomingReqs , acceptedReqs});

    } catch (error) {
        console.log("Error in getFriendRequsts controller" , error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getOutgoingFriendReqs(req,res){
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient" , "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error in getOutgoingFriendRequest controller",  error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}