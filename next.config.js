module.exports = {
	trailingSlash: true,
	exportPathMap: function() {
	  return {
		'/': { page: '/' },
		'/play': { page: '/play' },
	  };
	}
  };