const baseUrl = (url) => {
    //const fullUrl = "https://api.afrapardaz.com/api/v1" + url;
    const fullUrl = "http://192.168.2.3:6001/api" + url;
    return fullUrl;
  };
  
  module.exports = {baseUrl};
  