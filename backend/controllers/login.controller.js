const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = results[0];

            // Compare password
            const isMatch = bcrypt.compareSync(password, user.password_hash);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.user_id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Send response
            res.status(200).json({
                message: "Login successful",
                token: token,
                user: {
                    id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
};