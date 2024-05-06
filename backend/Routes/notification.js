import express from "express"
import { notificationsController } from "../Controllers/notificationsController.js"
import { authenticate } from "../auth/verifyToken.js"

const router = express.Router()

router.get('/', authenticate, notificationsController.getNotification)
router.post('/', notificationsController.addNotification)
router.delete('/:id', notificationsController.deleteNotification)

export default router;
