import express from 'express'
// import { getAllReview, createReview } from '../Controllers/reviewController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import { getAllBooking, getStats, getEarningStats, getWeekSales, getTransactions, createStripe, updateBooking} from '../Controllers/bookingController.js';

const router = express.Router({mergeParams: true})

router.get('/stats', getStats)
router.get('/income/stats', getEarningStats)
router.get('/week-sales', getWeekSales)
router.get('/transaction', getTransactions)
router.put('/:id', updateBooking)


// // nesting route    
// // doctor/DoctorId/bookings http://localhost:5000/api/v1/doctors/654e27f119b8075464c7ce89/bookings/
router.route('/').get(getAllBooking).post(authenticate, restrict(['patient']), createStripe)
// router.post('/:doctorId',authenticate, restrict(['patient']), createStripe)
// router.get('/',authenticate, restrict(['patient']), getAllBooking)
export default router;