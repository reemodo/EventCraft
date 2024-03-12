const pikudHaoref = require('pikud-haoref-api');
const RedAlert = require("../../models/redAlert");

class RedCollManager {
  async getRedAlertByLocation(location) {
    try {

      const redAlertData = await pikudHaoref.getRedAlertData(location);

      if (redAlertData) {
        const newRedAlert = new RedAlert({
          location: redAlertData.location,
          message: redAlertData.message,
          severity: redAlertData.severity
        });
        
        await newRedAlert.save();

        return newRedAlert;
      } else {
        throw new Error('Red Alert data not found for the location');
      }
    } catch (error) {
      throw new Error('Failed to fetch Red Alert data');
    }
  }
}

module.exports = new RedCollManager();
