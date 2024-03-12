const pikudHaoref = require('pikud-haoref-api');
const RedAlert = require("../../models/redAlert");

class RedCollManager {
  async getRedAlertByCity(city) {
    try {
      // Call the pikud-haoref-api method to fetch Red Alert data by city
      const redAlertData = await new Promise((resolve, reject) => {
        pikudHaoref.gitMetadataCity(city, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      if (redAlertData) {
        // Process and save the Red Alert data
        const newRedAlert = new RedAlert({
          location: redAlertData.location,
          message: redAlertData.message,
          severity: redAlertData.severity
        });
        await newRedAlert.save();

        return newRedAlert;
      } else {
        throw new Error('Red Alert data not found for the city');
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Failed to fetch Red Alert data');
    }
  }
}

module.exports = new RedCollManager();
