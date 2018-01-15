/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome
  let review1 = {
    rating: 5, 
    text: `This is a SWEET beanie baby!!!!`,
    babyId: 1, 
    userId: 1
  }
  let review2 = {
    rating: 3, 
    text: `I <3 this beanie`, 
    babyId: 1, 
    userId: 1
  }
  let order = {
    total: 11000.00, 
    complete: false, 
    orderedAt: Date.now(), 
    userId: 2
  }
  beforeEach(() => {
    userHome = shallow(<UserHome 
      email={'cody@email.com'} 
      user={
        {
          email: 'cody@email.com',
          firstname: 'Cody',
          lastname: 'Pooch',
          isAdmin: false,
          password: '234',
          reviews: [
            {review1, review2}
          ],
          orders: [
            {order}
          ]
        }
    }/>)
  })
  describe('basic architecture', () => {

    it('renders the first name in an h3', () => {
      expect(userHome.find('h3').text()).to.be.equal('Welcome, Cody')
    })
    it('expects two h5 components', () => {
      expect(userHome.find('h5')).to.have.length(2)
    })
    it('expects two unordered lists', () => {
      expect(userHome.find('ul')).to.have.length(2)
    })
  })

  describe('conditional rendering', () => {
    it('renders the orders in an unordered list', () => {
      expect(userHome.find('[id="orderTitle"]')).to.have.length(1)
    })
    it('renders the reviews in an unordered list', () => {
      expect(userHome.find('[id="reviewList"]')).to.have.length(1)
    })
  })
})
