const User = require('./user')
const Baby = require('./baby')
const LineItem = require('./lineItem')
const Order = require('./order')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
LineItem.belongsTo(Baby)
Order.belongsTo(User)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Baby)
Baby.hasMany(Review)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Baby,
  LineItem,
  Order,
  Review
}

// completed column in orders
