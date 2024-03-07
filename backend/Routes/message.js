import express from 'express'
import { createMessage, getAllMessage } from '../Controllers/MessageController.js';

const router = express.Router({mergeParams: true})


router.get('/', getAllMessage)
router.post('/', createMessage)

export default router;