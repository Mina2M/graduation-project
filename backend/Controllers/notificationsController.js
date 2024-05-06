import Booking from "../models/BookingSchema.js"
import Notification from "../models/NotificationSchema.js"

const getNotification = async (req, res) => {
    try {
        console.log('user-id', req.userId)
        const notifications = await Notification.find({user: req.userId})
        // res.status(200).json(notifications)
        res.status(200).json({success: true, message:'Successful', data:notifications})

    } catch (err) {
        res.status(500).json({ err: 'failed to get notification' })
    }
}

const addNotification = async (req, res) => {
    try {
        const { bookingId } = req.body
        const booking = await Booking.findById(bookingId)

        const notification = await Notification.create({
            text: `Your ${booking.doctor.name} appointment is ${booking.status}`,
            user: booking.user._id
        })

        await notification.save()

        res.status(201).json({ msg: 'created ok', data: notification })
    } catch (err) {
        res.status(500).json({ err: 'failed to create notification' })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const id = req.params.id
        await Notification.findByIdAndDelete(id)
        res.status(204).json({ msg: 'Notification deleted' })
    } catch (err) {
        res.status(500).json({ err: 'failed to delete notification' })
    }
}

export const notificationsController = {
    addNotification,
    getNotification,
    deleteNotification
}
