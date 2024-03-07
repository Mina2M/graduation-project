import express from "express";
import {updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor, getAllDoctorForAdmin, getDoctorProfile} from '../Controllers/doctorController.js';
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from './review.js'
import bookRouter from './booking.js'

const router = express.Router()

// nested routes
router.use('/:doctorId/reviews', reviewRouter)
router.use('/:doctorId/bookings', bookRouter)


router.get('/', getAllDoctor)
// router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor)
router.put('/:id', updateDoctor)
// router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor)
router.delete('/:id', deleteDoctor)
router.get('/admin', getAllDoctorForAdmin)
router.get('/:id', getSingleDoctor)



router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile)

export default router;