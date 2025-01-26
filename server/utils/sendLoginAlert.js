const { transporter, sender } = require('../config/Email');

const sendLoginAlert = async (user, deviceInfo) => {
    try {
        const mailOptions = {
            from: sender,
            to: user.email,
            subject: 'New Login Alert - Poll Gram',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a73e8;">New Login Detected</h2>
                    <p>Hello ${user.username},</p>
                    <p>We detected a new login to your account.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                        <h3 style="color: #202124;">Login Details:</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            <li>📅 Date: ${deviceInfo.timestamp.toLocaleString()}</li>
                            <li>📱 Device: ${deviceInfo.platform}</li>
                            <li>🌐 Browser: ${deviceInfo.browser} ${deviceInfo.version}</li>
                            <li>💻 Operating System: ${deviceInfo.os}</li>
                            <li>📍 Location: ${deviceInfo.location}</li>
                        </ul>
                    </div>

                    <p style="color: #d93025; margin-top: 20px;">
                        If this wasn't you, please secure your account immediately by changing your password.
                    </p>
                    
                    <p style="margin-top: 30px; color: #5f6368;">
                        Best regards,<br>
                        Poll Gram Team
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending login alert:', error);
        return false;
    }
};

module.exports = sendLoginAlert; 