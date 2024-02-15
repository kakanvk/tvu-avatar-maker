const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', authMiddleware.authenticate, eventController.createEvent);
router.put('/:id', authMiddleware.authenticate, authMiddleware.checkEventOwnership, eventController.updateEventById);
router.delete('/', authMiddleware.authenticate, eventController.deleteEventsByIds);

module.exports = router;