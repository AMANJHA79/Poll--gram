const moment = require('moment-timezone');

// Set default timezone (optional)
moment.tz.setDefault('UTC');

// Helper functions
const formatDateTime = (date, timezone) => {
    return moment(date).tz(timezone).format('MMMM D [at] h:mm A [(]z[)]');
};

const getCurrentTime = (timezone) => {
    return moment().tz(timezone).format();
};

module.exports = {
    formatDateTime,
    getCurrentTime
}; 