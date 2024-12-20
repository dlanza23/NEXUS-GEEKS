import Subscription from "../models/subscription.model.js";

/**
 * get filtered subscriptions
 * @function getFilteredSubscriptions
 * @async - The function is asynchronous
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Object} - The subscriptions
 */
export const getallSubs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { planId } = req.body;
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan de suscripción no encontrado' });
    }
    const newSubscription = new UserSubscription({
      user: userId,
      plan,
      startDate: Date.now(),
    });
    await newSubscription.save();
    const user = await User.findById(userId);
    user.isSubscribed = true;
    await user.save();
    res.status(201).json({ message: 'Suscription created succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error created suscription' });
  }
};