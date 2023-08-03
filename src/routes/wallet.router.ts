import express from "express";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import { creditOrDebit, getWalletBalance, getWalletTransactions, } from "../controllers/userWallet.controller";

const router = express.Router();
router.get("/", getWalletTransactions, handleSequelizeError);
router.get("/balance", getWalletBalance, handleSequelizeError);
router.post("/", creditOrDebit, handleSequelizeError);

export default router;
