var pagesCache = false;
var pageObjectCache = {};

module.exports = {
  getPagesCache: function() {
    return pagesCache;
  },
  setPagesCache: function(data) {
    pagesCache = data;
  },
  getPageObjectsCache: function(pageId) {
    if(pageObjectCache[pageId]) {
      return pageObjectCache[pageId];
    }
    return false;
  },
  setPageObjectCache:  function(pageId, data) {
    pageObjectCache[pageId] = data;
  }
};
