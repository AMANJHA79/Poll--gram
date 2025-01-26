const useragent = require('express-useragent');
const geoip = require('geoip-lite');

const getDeviceInfo = (req) => {
    // Get IP address
    const ip = req.ip || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress || 
              req.connection.socket.remoteAddress;

    // Get location from IP
    const geo = geoip.lookup(ip);

    // Get device details
    const userAgent = req.useragent;

    return {
        browser: userAgent.browser,
        version: userAgent.version,
        os: userAgent.os,
        platform: userAgent.platform,
        isMobile: userAgent.isMobile,
        isDesktop: userAgent.isDesktop,
        location: geo ? `${geo.city}, ${geo.country}` : 'Unknown',
        ip: ip,
        timestamp: new Date()
    };
};

module.exports = getDeviceInfo; 