import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        console.log("[sendMessage] Handler called");
        console.log("[sendMessage] req.id:", req.id);
        console.log("[sendMessage] req.params.id:", req.params.id);
        console.log("[sendMessage] req.body:", req.body);
        
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        
        if (!senderId || !receiverId || !message) {
            console.log("[sendMessage] Missing required fields");
            return res.status(400).json({ message: "All fields required" });
        }
        
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        
        if (!gotConversation) {
            console.log("[sendMessage] Creating new conversation");
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
            conversationId: gotConversation._id
        });
        
        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }
        
        await gotConversation.save();
        
        console.log("[sendMessage] Message sent successfully");
        return res.status(201).json({ 
            message:"Message send successfully"
        });

    } catch (error) {
        console.log("[sendMessage] Error:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        
        return res.status(200).json({
            messages: conversation?.messages || []
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const userId = req.id;
        
        // Find the message
        const message = await Message.findById(messageId);
        
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        
        // Only allow sender to delete their own message
        if (message.senderId.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this message" });
        }
        
        await Message.findByIdAndDelete(messageId);
        
        // Remove message from conversation
        await Conversation.findByIdAndUpdate(
            message.conversationId,
            { $pull: { messages: messageId } },
            { new: true }
        );
        
        return res.status(200).json({ message: "Message deleted successfully" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
}

export const deleteAllMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        
        // Delete all messages from this conversation
        await Message.deleteMany({ _id: { $in: conversation.messages } });
        
        // Clear messages array in conversation
        conversation.messages = [];
        await conversation.save();
        
        return res.status(200).json({ message: "All messages deleted successfully" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
}