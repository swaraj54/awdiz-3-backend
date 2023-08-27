
import twilio from 'twilio';

export const sendTwilioMessage = async (toNumber, messageBody) => {
    try {
        const client = twilio(process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTHTOKEN);
        const message = await client.messages.create({
            body: messageBody,
            from: process.env.TWILIO_FROM_NUMBER,
            to: `+91${toNumber}`
        });
        return message.sid;
    } catch (error) {
        console.log(error, "error in tw")
        throw new Error('Failed to send Twilio message.');
    }
};