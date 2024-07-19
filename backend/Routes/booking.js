import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js'
import { getAllBooking, getStats, getEarningStats, getWeekSales, getTransactions, createStripe, updateBooking} from '../Controllers/bookingController.js';

const router = express.Router({mergeParams: true})

router.get('/stats', getStats)
router.get('/income/stats', getEarningStats)
router.get('/week-sales', getWeekSales)
router.get('/transaction', getTransactions)
router.put('/:id', updateBooking)


// nesting route    
router.route('/').get(getAllBooking).post(authenticate, restrict(['patient']), createStripe)
export default router;
