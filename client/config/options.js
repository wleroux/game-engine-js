module.exports = {
   lag: {
      client_lag: 0,
      server_lag: 0,
      prediction: true,
      reconcilation: true,
      interpolation: true
   }
};

// Allow us to modify this!
document.options = module.exports;
