import { getRabbitMqChannel } from "../config/rabbitChannel.js";

const QUEUE = process.env.RABBITMQ_QUEUE_RESERVATION || 'huoltovaraus_reservation';

export async function startConsumer(onMessage) {
    const { connection, channel } = await getRabbitMqChannel();
    await channel.assertQueue(QUEUE, { durable: true });

    console.log(`Waiting for messages in ${QUEUE}...`);

    channel.consume(QUEUE, async (msg) => {
        if (msg !== null) {
            try {
                const content = msg.content.toString();
                const data = JSON.parse(content);
                await onMessage(data, msg, channel); // Pass channel to callback
                channel.ack(msg);
            } catch (err) {
                console.error('Failed to process message:', err);
                channel.nack(msg, false, true); // requeue the message
            }
        }
    });

    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        await channel.close();
        await connection.close();
        process.exit(0);
    });
}