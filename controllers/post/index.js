const {
  create,
  update,
  load,
  loadOne,
  search,
  deletePost,
} = require('./postController');

const { loadRandom, loadMostViews, loadLatest } = require('./loadPost');

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
};
