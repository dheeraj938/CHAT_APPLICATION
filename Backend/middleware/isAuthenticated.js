import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token received:", token ? "YES" : "NO");
        
        if (!token) {
            return res.status(401).json({message:"User not authenticated."})
        }
        
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Token decoded:", decode);
       
        if (!decode) {
            return res.status(401).json({message:"Invalid token"})
        }
        
        req.id = decode.userID;
        console.log("User ID set to:", req.id);
      
        next();
        
    } catch (error) {
        console.log("Authentication error:", error.message);
        return res.status(401).json({message: "Authentication failed", error: error.message});
    }
};

export default isAuthenticated;