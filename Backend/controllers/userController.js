
import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ message: "password do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            ProfilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto
            ,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isPasswordMatch);
        console.log("Stored Password:", user.password);
        console.log("Input Password:", password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        }
        const tokentData = {
            userID: user._id
        };
        const token = await jwt.sign(tokentData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            ProfilePhoto: user.ProfilePhoto
        });
        
    } catch (error) {
        console.error("Login Error:", error.message);
        console.error("Error Stack:", error.stack);
        console.error("Full Error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            errorMsg: error.message,
            errorType: error.name
        });
    }
}
export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message:"logged out successfully."
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
        
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}