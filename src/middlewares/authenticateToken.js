import jwt from "jsonwebtoken";

const SECRET_KEY = 'my_secret_key';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Токен відсутній" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Токен недійсний" });
        }

        req.user = user;
        next();
    });
};
