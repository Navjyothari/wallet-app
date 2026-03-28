const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: "Transaction error" });
        }
        const userQuery =
            "INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)";

        db.query(userQuery, [name, email, phone, hashedPassword], (err, result) => {
            if (err) {
                return db.rollback(() =>
                    res.status(500).json({ message: "User may already exist", error: err })
                );
            }
            const userId = result.insertId;
            const walletQuery =
                "INSERT INTO wallets (user_id, balance) VALUES (?, 0)";

            db.query(walletQuery, [userId], (err) => {
                if (err) {
                    return db.rollback(() =>
                        res.status(500).json({ message: "Wallet creation failed", error: err })
                    );
                }
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() =>
                            res.status(500).json({ message: "Commit failed" })
                        );
                    }

                    return res.status(201).json({
                        message: "User registered successfully",
                        userId: userId
                    });
                });
            });
        });
    });
};