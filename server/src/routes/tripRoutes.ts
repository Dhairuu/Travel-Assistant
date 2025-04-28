import express from 'express';
import { testSaveFormattedTrip, getLatestTripData, toggleActivityCompleted, updateTripAndRelated, partialUpdateTrip, partialUpdateHotel, partialUpdateTransport, partialUpdateActivity } from '../controllers/tripController';
import { authenticateJWT } from '../utils/authMiddleware';

const router = express.Router();

router.post('/test-save', authenticateJWT, testSaveFormattedTrip);
router.get('/latest', authenticateJWT, getLatestTripData);
router.patch('/activities/:activity_id/toggle-completed', authenticateJWT, toggleActivityCompleted);
router.put('/:trip_id', authenticateJWT, updateTripAndRelated);
router.patch('/:trip_id', authenticateJWT, partialUpdateTrip);
router.patch('/hotels/:hotel_id', authenticateJWT, partialUpdateHotel);
router.patch('/transports/:transport_id', authenticateJWT, partialUpdateTransport);
router.patch('/activities/:activity_id', authenticateJWT, partialUpdateActivity);

export default router; 