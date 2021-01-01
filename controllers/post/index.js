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

module.exports = {
  create,
  update,
  load,
  loadOne,
  search,
  deletePost,
  loadRandom,
  loadMostViews,
  loadLatest,
  loadByCategory,
  loadByTag,
};
