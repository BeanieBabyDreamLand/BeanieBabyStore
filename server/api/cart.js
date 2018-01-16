const router = require('express').Router()
const { LineItem, Baby, Order, User } = require('../db/models')
module.exports = router
    

router.get('/', (req, res, next) => {
    if (req.session.passport.user){
        const userId = req.session.passport.user
        Order.find({
            where: { userId: userId, complete: false}
        })
        .then(incompleteOrder => {
            if (incompleteOrder){
                const orderId = incompleteOrder.id
                return (
                    LineItem.findAll({
                        where: {orderId: orderId},
                        include: [{model: Baby}, {model: Order}]
                    })
                )
            }
        })
        .then(cartItems => {
            if (cartItems){
                req.session.cart = cartItems
                res.send(req.session.cart)
            }
        })
        .catch(next)
    }
    else {
        req.session.cart = []
        res.send(req.session.cart)
    }
})

//The Put Post and delete routes need to run AFTER the orders/lineitems put/post/delete
//routes run otherwise the cart get request will bring back all lineitems which are part
//of an incomplete order. 

// ----- update cart ---- \\
router.put('/:lineItemId', (req, res, next) => {
    LineItem.findOne({where: {id: req.params.lineItemId}})
    .then(itemToUpdate => {
        const cartItemToUpdate = req.session.cart.find(elem => {
            return elem.id === itemToUpdate.id
        })
        return cartItemToUpdate
    })
    .then(cartItemToUpdate => {
        cartItemToUpdate.price = req.body.price
        cartItemToUpdate.quantity = req.body.quantity
    })
    .then(() => res.send(req.session.cart))
    .catch(next)
})

//we don't have to have post and put requests for the session cart becuase we are jut reloading it at every hard refresh from the database data

// ---- remove from cart ---- \\
router.delete('/:lineItemId', (req, res, next) => {
    let cart = req.session.cart, newCart
    LineItem.destroy({where: {id: req.params.lineItemId}})
    // .then(itemToRemove => {
    //    newCart = cart.filter(elem => {
    //        return elem.id !== itemToRemove.id
    //    })
    //    cart = newCart
    //    res.send(cart)
    // })
    .then(() => {
        res.send("Beanie sent back to the farm :)")
    })
    .catch(next)
})

router.delete('/',(req,res,next) => {
    req.session.cart = []
    res.send(req.session.cart)
    .catch(next)
})