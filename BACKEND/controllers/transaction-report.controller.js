import Transaction from "../models/transaction.model.js";

/**
 * @description Get all transactions
 * @function getAllTransactions
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of transactions
 * @returns {Object} - List of transactions
 * @method GET
 */
export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, sender, receiver, startDate, endDate } = req.query;
    const query = {};
    if (type) query.type = type;
    if (sender) query.sender = sender;
    if (receiver) query.receiver = receiver;
    if (startDate) query.createdAt = { $gte: new Date(startDate) };
    if (endDate) query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
    const Transactions = await Transaction.find(query)
      .populate('sender')
      .populate('receiver')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      res.json(Transactions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting transacctions' });
  }
};