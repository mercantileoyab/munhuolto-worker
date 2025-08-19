import transporter from "../config/emailTransporter.js";

const sendReservationEmail = async (reservationData, html) => {
    const mailOptions = {
        from: '"Munhuolto.fi" <no-reply@munhuolto.fi>',
        // to: reservationData.customer.email,
        to: reservationData.reservation.customer.email,
        subject: 'Varausvahvistus',
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reservation email sent successfully');
    } catch (error) {
        console.error('Error sending reservation email:', error);
    }
};

export default sendReservationEmail;

