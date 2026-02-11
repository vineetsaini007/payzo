const express = require("express");
const  { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default : mongoose } = require('mongoose');
const router = express.Router();

router.get("/balance", authMiddleware ,async(req,res) =>
{
    const account = await Account.findOne({
        userId : req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { amount, to } = req.body;

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Recipient account not found"
            });
        }

        // Deduct money
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        // Add money
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.json({
            message: "Transfer successful"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        return res.status(500).json({
            message: "Transaction failed"
        });
    }
});

module.exports = router;