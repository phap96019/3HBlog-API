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
};
