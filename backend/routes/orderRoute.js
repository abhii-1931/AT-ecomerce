import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrder, userOrders, updateStatus} from '../controllers/orderController.js'
import admintAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', admintAuth, allOrder)
orderRouter.post('/status', admintAuth, updateStatus)


orderRouter.post('/palce', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)


orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter