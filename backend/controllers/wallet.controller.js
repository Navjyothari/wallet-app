const db = require('../config/db');

exports.getWallet = (req, res) => {
    const userId = req.user.userId;

    db.query(
        "SELECT * FROM wallets WHERE user_id = ?",
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Wallet not found" });
            }

            res.status(200).json({
                wallet: results[0]
            });
        }
    );
};


exports.addMoney = (req, res) => {
    const userId = req.user.userId;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ message: "Transaction error" });

        // Step 1: Get wallet
        db.query(
            "SELECT * FROM wallets WHERE user_id = ?",
            [userId],
            (err, results) => {
                if (err || results.length === 0) {
                    return db.rollback(() =>
                        res.status(404).json({ message: "Wallet not found" })
                    );
                }

                const wallet = results[0];
                const newBalance = parseFloat(wallet.balance) + parseFloat(amount);

                // Step 2: Update wallet
                db.query(
                    "UPDATE wallets SET balance = ? WHERE user_id = ?",
                    [newBalance, userId],
                    (err) => {
                        if (err) {
                            return db.rollback(() =>
                                res.status(500).json({ message: "Balance update failed" })
                            );
                        }

                        // Step 3: Insert transaction
                        db.query(
                            `INSERT INTO transactions 
              (user_id, wallet_id, type, source, amount, balance_after, status) 
              VALUES (?, ?, 'credit', 'upi', ?, ?, 'success')`,
                            [userId, wallet.wallet_id, amount, newBalance],
                            (err) => {
                                if (err) {
                                    return db.rollback(() =>
                                        res.status(500).json({ message: "Transaction failed" })
                                    );
                                }

                                // Step 4: Commit
                                db.commit((err) => {
                                    if (err) {
                                        return db.rollback(() =>
                                            res.status(500).json({ message: "Commit failed" })
                                        );
                                    }

                                    res.status(200).json({
                                        message: "Money added successfully",
                                        newBalance
                                    });
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};


exports.sendMoney = (req, res) => {
    const senderId = req.user.userId;
    const { receiverId, amount } = req.body;

    if (!receiverId || !amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid input" });
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ message: "Transaction error" });

        // Step 1: Get sender wallet
        db.query(
            "SELECT * FROM wallets WHERE user_id = ?",
            [senderId],
            (err, senderResult) => {
                if (err || senderResult.length === 0) {
                    return db.rollback(() =>
                        res.status(404).json({ message: "Sender wallet not found" })
                    );
                }

                const senderWallet = senderResult[0];

                if (senderWallet.balance < amount) {
                    return db.rollback(() =>
                        res.status(400).json({ message: "Insufficient balance" })
                    );
                }

                const senderNewBalance = senderWallet.balance - amount;

                // Step 2: Get receiver wallet
                db.query(
                    "SELECT * FROM wallets WHERE user_id = ?",
                    [receiverId],
                    (err, receiverResult) => {
                        if (err || receiverResult.length === 0) {
                            return db.rollback(() =>
                                res.status(404).json({ message: "Receiver not found" })
                            );
                        }

                        const receiverWallet = receiverResult[0];
                        const receiverNewBalance =
                            parseFloat(receiverWallet.balance) + parseFloat(amount);

                        // Step 3: Update sender wallet
                        db.query(
                            "UPDATE wallets SET balance = ? WHERE user_id = ?",
                            [senderNewBalance, senderId],
                            (err) => {
                                if (err) {
                                    return db.rollback(() =>
                                        res.status(500).json({ message: "Sender update failed" })
                                    );
                                }

                                // Step 4: Update receiver wallet
                                db.query(
                                    "UPDATE wallets SET balance = ? WHERE user_id = ?",
                                    [receiverNewBalance, receiverId],
                                    (err) => {
                                        if (err) {
                                            return db.rollback(() =>
                                                res.status(500).json({ message: "Receiver update failed" })
                                            );
                                        }

                                        // Step 5: Insert sender transaction (debit)
                                        db.query(
                                            `INSERT INTO transactions 
                      (user_id, wallet_id, type, source, amount, balance_after, status)
                      VALUES (?, ?, 'debit', 'wallet', ?, ?, 'success')`,
                                            [
                                                senderId,
                                                senderWallet.wallet_id,
                                                amount,
                                                senderNewBalance,
                                            ],
                                            (err) => {
                                                if (err) {
                                                    return db.rollback(() =>
                                                        res.status(500).json({ message: "Sender tx failed" })
                                                    );
                                                }

                                                // Step 6: Insert receiver transaction (credit)
                                                db.query(
                                                    `INSERT INTO transactions 
                          (user_id, wallet_id, type, source, amount, balance_after, status)
                          VALUES (?, ?, 'credit', 'wallet', ?, ?, 'success')`,
                                                    [
                                                        receiverId,
                                                        receiverWallet.wallet_id,
                                                        amount,
                                                        receiverNewBalance,
                                                    ],
                                                    (err) => {
                                                        if (err) {
                                                            return db.rollback(() =>
                                                                res.status(500).json({ message: "Receiver tx failed" })
                                                            );
                                                        }

                                                        // Step 7: Commit
                                                        db.commit((err) => {
                                                            if (err) {
                                                                return db.rollback(() =>
                                                                    res.status(500).json({ message: "Commit failed" })
                                                                );
                                                            }

                                                            res.status(200).json({
                                                                message: "Money sent successfully",
                                                            });
                                                        });
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
};

exports.getTransactions = (req, res) => {
    const userId = req.user.userId;

    db.query(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            res.status(200).json({
                transactions: results
            });
        }
    );
};