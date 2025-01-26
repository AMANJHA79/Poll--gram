const LoginHistory = require('../models/LoginHistory');

const saveLoginHistory = async (userId, deviceInfo) => {
    try {
        await LoginHistory.create({
            user: userId,
            device: {
                browser: deviceInfo.browser,
                version: deviceInfo.version,
                os: deviceInfo.os,
                platform: deviceInfo.platform,
                isMobile: deviceInfo.isMobile,
                isDesktop: deviceInfo.isDesktop
            },
            location: {
                city: deviceInfo.location,
                ip: deviceInfo.ip
            }
        });
        return true;
    } catch (error) {
        console.error('Error saving login history:', error);
        return false;
    }
};

module.exports = saveLoginHistory; 