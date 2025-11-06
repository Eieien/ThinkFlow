import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if(!bearer) return res.status(403).json({ message: 'Forbidden access' });
    const accessToken = bearer.split(' ')[1];
    jwt.verify(
        accessToken, 
        process.env.ACCESS_TOKEN_SECRET,
        (err) => {
            if(err) return res.status(401).json({ message: err.message });
            next();
        }
    );
}

export default verifyToken;