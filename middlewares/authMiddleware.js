import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized request');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }

        req.userId = decoded.userId;
        next();
    });
}