import Transaction from "../models/transaction.model.js";

/**
 * createTransaction
 * @description Creates a new transaction
 * @function - createTransaction
 * @async - The function is asynchronous
 * @returns {Object} - The created transaction
 * @param {*} req - The request object
 * @param {*} res - The response object
 */
export const createTransaction = async (req, res) => {
  try {
    const { user, amount, currency, status, paymentMethod } = req.body;
    const Transaction = new Transaction({
      user,
      amount,
      currency,
      status,
      paymentMethod,
    });
    await transaction.save();
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

/**
 * get Transactions
 * @description Gets all transactions
 * @function  getTransactions
 * @async - The function is asynchronous
 * @returns {Object} - The transactions
 * @param {*} req - The request object
 * @param {*} res - The response object
 */
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting transaction' });
  }
};

/**
 * delete Transaction
 * @description Deletes a transaction
 * @function  deleteTransaction
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns - {Object} - The deleted transaction
 */
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleted transacction' });
  }
};

/**
 * updateTransaction
 * @description Updates a transaction
 * @function  updateTransaction
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns - {Object} - The updated transaction
 */
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updated transacction' });
  }
};