/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Baby, LineItem, Order, Review} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', firstname: 'Cody', lastname: 'Kelly', isAdmin: true}),
    User.create({email: 'rachel@email.com', password: '123', firstname: 'Rachel', lastname: 'Arkebauer', isAdmin: false}),
    User.create({email: 'appropriateilana@email.com', password: 'yassss', firstname: 'Ilana', lastname: 'Wexler', isAdmin: false})
  ])
  const babies = await Promise.all([
    Baby.create({name: 'Derby', poem: `All the other horses used to tattle \n Because Derby never wore his saddle \n
    He left the stables, and the horses too \n Just so Derby can be with you!`, price: 9000.00, inventory_qty: 2, category: 'unicorn'}),
    Baby.create({name: 'Chocolate the Moose', poem: `Licorice, gum and peppermint candy \n This moose always has these handy \n There is one more thing he likes to eat \n Can you guess his favourite sweet?`, price: 1000.00, inventory_qty: 7, category: 'rare'}),
    Baby.create({name: 'Patti the Platypus', poem: `Ran into Patti one day while walking \n Believe me she wouldn’t stop talking \n
    Listened and listened to her speak \n That would explain her extra large beak!`, price: 700.00, inventory_qty: 12, category: 'common'})
  ])
  const orders = await Promise.all([
    Order.create({total: 11000.00, complete: false, orderedAt: Date.now(), userId: 2}),
    Order.create({total: 4700.00, complete: false, orderedAt: Date.now(), userId: 1}),
    Order.create({total: 600.00, complete: true, orderedAt: Date.now(), userId: 1})
  ])
  const lineItems = await Promise.all([
    LineItem.create({price: 2000.00, quantity: 2, babyId: 2, orderId: 1}),
    LineItem.create({price: 9000.00, quantity: 1, babyId: 1, orderId: 1}),
    LineItem.create({price: 700.00, quantity: 1, babyId: 3, orderId: 2}), LineItem.create({price: 2000.00, quantity: 2, babyId: 2, orderId: 2})
  ])
  const reviews = await Promise.all([
    Review.create({rating: 5, text: `This is a SWEET beanie baby!!!!!!! should have bought more back in '95 when he came out.......will never regret this purchase tho`, babyId: 1, userId: 2}),
    Review.create({rating: 1, text: `pretty unrealistic that a moose could eat chocolate (dogs cant digest it)...... would NOT purchase again ...try again TY`, babyId: 2, userId: 1}),
    Review.create({rating: 5, text: 'Patti the Platypus will be my bride. We are extremely happy together and I CANNOT wait to start the rest of our lives :`)', babyId: 3, userId: 3})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${babies.length} babies`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${lineItems.length} lineItems`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
