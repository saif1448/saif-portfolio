import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ message: 'Name and message are required' });
    }

    try {
        const emailResponse = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', // Must be a verified sender in Resend
            to: ['saif.mahmud.parvez@gmail.com'],         // Your destination email
            subject: `New Message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Message:</strong> ${message}</p>`,
        });

        console.log(emailResponse); // Optional: check response

        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ message: 'Failed to send message.' });
    }
}
