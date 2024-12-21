import Subscription from "../models/suscription.model"

/**
 * create subscription
 * @function createSubs
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Object} - The subscription
 */
export const createSubs = async (req, res) => {
  try {
    const Subscription = await Subscription.create(req.body);
    res.status(201).json(Subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error create suscription' });
};
}

/**
 * update subscription
 * @function updateSubs
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Object} - The subscription
 * @method PATCH
 * @returns {Object} - The updated subscription
 * @returns {Object} - The subscription
 */
export const updateSubs = async (req, res) => {
  try {
    const Subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!Subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json(Subscription);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ message: 'Error updated suscription' });
    }
  }
};

/**
 * delete subscription
 * @function cancelSubs
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @method PATCH
 * @returns {Object} - The cancel subscription
 */
export const cancelSubs = async (req, res) => {
  try {
    const Subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    if (!Subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json(Subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error canceled suscription' });  }
};