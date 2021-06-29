const {
  create,
  update,
  load,
  loadOne,
  search,
  deletePost,
} = require('./postController');

const {
  loadRandom,
  loadMostViews,
  loadLatest,
  loadByCategory,
  loadByTag,
} = require('./loadPost');

const {
  searchv2,
  syncES
} = require('./search')

module.exports = {
  create,
  update,
  load,
  loadOne,
  search,
  searchv2,
  deletePost,
  loadRandom,
  loadMostViews,
  loadLatest,
  loadByCategory,
  loadByTag,
  syncES,
};
