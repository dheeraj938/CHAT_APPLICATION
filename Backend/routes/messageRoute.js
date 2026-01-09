import express from "express";
import { sendMessage, getMessages, deleteMessage, deleteAllMessages } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

console.log("Message route loaded - /send/:id and /get/:id routes registered");

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/get/:id").get(isAuthenticated, getMessages);
router.route("/delete/:messageId").delete(isAuthenticated, deleteMessage);
router.route("/deleteAll/:id").delete(isAuthenticated, deleteAllMessages);

export default router;