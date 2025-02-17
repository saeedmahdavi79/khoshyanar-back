const configUrls = (addUrl) => {
  const baseUrl = "https://api.zibal.ir/v1/";

  return baseUrl + `${addUrl}`;
};

module.exports = {
  configUrls,
};
