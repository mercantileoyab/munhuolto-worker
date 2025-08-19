import { startConsumer } from './queues/reservationQueue.js';
import { handleNewReservation } from './services/reservationService.js';

// Start the consumer for the reservation queue
startConsumer(async (reservationData, msg, channel) => {
    try {
        // Process the reservation data
        await handleNewReservation(reservationData);
    } catch (error) {
        console.error('Error processing reservation:', error); 
    }    
    
});