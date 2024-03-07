import express from "express"
import { notificationsController } from "../Controllers/notificationsController.js"

const router = express.Router()

router.get('/', notificationsController.getNotification)
router.post('/', notificationsController.addNotification)
router.delete('/:id', notificationsController.deleteNotification)

export default router;
