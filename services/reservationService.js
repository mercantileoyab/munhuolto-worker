import { writeFile } from 'fs/promises';
import sendReservationEmail from './emailService.js';

export async function handleNewReservation(reservationData) {
    // console.log('Handling new test reservation:', reservationData);
    const payload = {
        ...reservationData,
        frontendUrl: process.env.FRONTEND_URL
    };
    const response = await fetch('http://flask-email:3005/reservation-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        console.error('Error sending reservation confirmation:', response.statusText);
        return;
    }

    const html = await response.text();
    sendReservationEmail(reservationData, html);
    await saveHtmlFile(html);
}

async function saveHtmlFile(html) {
    
    const filePath = './reservation_confirmation.html';
    try {
        await writeFile(filePath, html, 'utf8');
        console.log(`Saved reservation confirmation HTML to ${filePath}`);
    } catch (err) {
        console.error('Failed to save HTML file:', err);
    }
}