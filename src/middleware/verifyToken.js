import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if(!bearer) return res.sendStatus(403);
    const accessToken = bearer.split(' ')[1];
    jwt.verify(
        accessToken, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err) => {
            if(err) return res.sendStatus(401);
            next();
        }
    );
}

export default verifyToken;