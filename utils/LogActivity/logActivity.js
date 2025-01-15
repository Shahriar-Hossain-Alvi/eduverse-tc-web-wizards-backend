const ActivityLog = require('./schema/activityLog.schema'); 

const logActivity = async (action, description) => {
    try {
        await ActivityLog.create({ action, description });
    } catch (error) {
        console.error("Error logging activity:", error);
    }
};

module.exports = logActivity;
