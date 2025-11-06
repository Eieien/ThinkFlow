import jwt from "jsonwebtoken";

const verifyOptionalToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    const accessToken = bearer?.startsWith('Bearer ') ? bearer.split(' ')[1] : null;
    if(!accessToken) return next();
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err) => {
            if(err) return res.status(401).json({ message: err.message });
            return next();
        }
    );
}

export default verifyOptionalToken;