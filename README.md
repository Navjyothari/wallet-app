# wallet-app
This project is a secure web-based wallet application designed to simulate real-world digital payment platforms. The system allows users to register, create a wallet automatically, add money through UPI integration, and perform wallet-based payments while maintaining financial integrity through a ledger-based transaction model.

The application is built with a backend-first architecture where all financial operations are verified and processed server-side. Instead of acting as a banking system, the platform functions as a stored-value wallet layer that records every credit and debit as an immutable transaction. This approach ensures consistency, auditability, and protection against duplicate or partial payment processing.

The project demonstrates how modern wallet systems integrate authentication, payment gateway interaction, database transactions, and cybersecurity principles into a cohesive platform. It emphasizes backend verification, idempotent payment handling, and separation between payment lifecycle tracking and wallet ledger updates.

⭐ Features

User registration and authentication

Automatic wallet creation per user

Wallet balance management

Add money via UPI payment gateway

Wallet-based payments

Ledger-based transaction tracking

Payment lifecycle management (payment attempts)

Idempotent payment handling

Backend-only payment verification

Secure MySQL schema with ACID transactions

🧠 Architecture Highlights

Users → Identity layer

Wallets → Stored value layer

Payment Attempts → External payment lifecycle

Transactions → Immutable financial ledger

This layered architecture mirrors real fintech wallet systems.

🔐 Security Highlights

Password hashing

Backend payment verification via webhooks

Idempotency keys to prevent duplicate credits

Database transaction safety

Separation of wallet state and ledger

Input validation and secure API design

🎯 Learning Goals

Backend system design for fintech applications

Payment lifecycle handling

Ledger-based wallet architecture

MySQL transactional integrity

Secure API development

Idempotent processing design

⭐ Tech Stack

Node.js

Express

MySQL

UPI Payment Gateway (conceptual integration)

REST APIs

🚀 Status

Active development — building backend-first wallet architecture.
