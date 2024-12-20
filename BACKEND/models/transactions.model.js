import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for transactions
 * @typedef {Object} transactionSchema
 * @property {String} user - User of the transaction
 * @property {Number} amount - Amount of the transaction
 * @property {String} currency - Currency of the transaction
 * @property {String} status - Status of the transaction
 * @property {String} paymentMethod - Payment method of the transaction
 * @property {Date} createdAt - Date of creation
 */

const transactionSchema = new mongoose.Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD"
    },
    status: {
      type: String,
      enum: ["completed", "failed"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "PayPal"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * Plugin for pagination
 */
transactionSchema.plugin(mongoosePaginate);

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };