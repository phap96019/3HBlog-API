const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const Post = require('../../models/Post');
const slug = require('slug');
var ObjectID = require('mongodb').ObjectID;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports.create = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        const { title, content, category, tags, summary } = fields;
        // Check fields require
        if (!title) throw 'Không được bỏ trống title';
        if (!content) throw 'Không được bỏ trống content';
        if (!summary) throw 'Không được bỏ trống summary';
        let ret = {};
        if (files && files.image && files.image.path) {
          const file = files.image.path;
          ret = await cloudinary.uploader.upload(file, {
            folder: 'home/3H-blog',
          });
        } else {
          ret.url =
            'https://res.cloudinary.com/ddiqvd0ty/image/upload/v1608477520/home/3H-blog/fgvpl0ouulibkhxqjpad.jpg';
        }
        let _category = [];
        if (category) {
          const temp1 = category.split(',');
          _category = temp1.map((t) => t.trim());
        }
        let _tags = [];
        if (tags) {
          const temp1 = tags.split(',');
          _tags = temp1.map((t) => t.trim());
        }
        const post = new Post({
          nameUrl: slug(title, '-'),
          title: title,
          img: ret.url,
          content: content ? content : '',
          category: _category,
          tags: _tags,
          summary: summary ? summary : '',
        });
        await post.save();
        res.status(200).send({
          success: true,
          data: post,
        });
      } catch (error) {
        res.status(403).send({
          success: false,
          message: error,
        });
      }
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      try {
        if (!ObjectID.isValid(fields.id)) throw 'id không hợp lệ';
        const post = await Post.findOne({ _id: fields.id });
        let ret = {};
        if (post) {
          if (files && files.image && files.image.path) {
            const file = files.image.path;
            ret = await cloudinary.uploader.upload(file, {
              folder: 'home/3H-blog',
            });
          } else {
            ret.url = post.img;
          }
          const { title, content, category, tags, summary } = fields;

          post.nameUrl = title ? slug(title, '-') : post.nameUrl;
          post.title = title || post.title;
          post.img = ret.url;
          post.content = content || post.content;
          post.category = category ? category.split(',') : post.category;
          post.tags = tags ? tags.split(',') : post.tags;
          post.summary = summary || post.summary;

          await post.save();
          res.status(200).send({
            success: true,
            data: post,
          });
        } else {
          res.status(403).send({
            success: false,
            message: 'Không tìm thấy _id bài viết',
          });
        }
      } catch (error) {
        res.status(404).send({
          success: false,
          message: error,
        });
      }
    });
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error,
    });
  }
};

module.exports.load = async (req, res) => {
  const postsNumber = await Post.countDocuments();
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const posts = await Post.find()
    .select('_id title nameUrl img summary category views tags createdAt')
    .skip(pageSize * page - pageSize)
    .limit(pageSize);
  res.status(200).send({
    total: postsNumber,
    data: posts,
  });
};

module.exports.loadOne = async (req, res) => {
  const { nameUrl } = req.params;
  const post = await Post.findOne({ nameUrl: nameUrl }).populate({
    path: 'comments',
    select: 'user content createdAt',
    populate: {
      path: 'user',
      select: 'name email',
    },
  });
  if (post) {
    post.views += 1;
    post.save();
    res.status(200).send(post);
  } else {
    res.status(404).send({
      message: 'Không thể tìm thất bài viết',
    });
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.body;
  const postDeleted = await Post.deleteOne({ _id: id });
  if (postDeleted.n == 1) {
    res.status(200).send(postDeleted);
  } else {
    res.status(403).send({
      message: 'Không thể xóa được!',
    });
  }
};

module.exports.search = async (req, res) => {
  const keySearch = slug(req.body.keySearch, '-');
  const keySearchs = keySearch.split('-');
  // get all data
  let posts = [];
  for (key of keySearchs) {
    const posts1 = await Post.find({
      nameUrl: { $regex: key },
    }).select('_id title nameUrl img summary category views tags createdAt');
    const posts2 = await Post.find({
      category: { $regex: key },
    }).select('_id title nameUrl img summary category views tags createdAt');
    const posts3 = await Post.find({
      tags: { $regex: key },
    }).select('_id title nameUrl img summary category views tags createdAt');
    posts = posts
      .concat(posts1)
      .concat(posts2)
      .concat(posts3);
  }
  // filter duplicate
  const postUnique = [];
  posts.forEach((post) => {
    // const key = JSON.stringify(post);
    let key = post._id;
    const existPost = postUnique.findIndex((post) => {
      return post.id.toString() === key.toString();
    });
    if (existPost > -1) {
      postUnique[existPost].score += 1;
    } else {
      postUnique.push({
        id: key,
        post: post,
        score: 1,
      });
    }
  });
  const results = [];
  postUnique
    .sort((a, b) => {
      return b.score - a.score;
    })
    .forEach((item) => {
      results.push(item.post);
    });
  if (posts.length === 0) {
    res.status(200).send({
      message: 'Không tìm thấy bài viết phù hợp',
    });
  } else {
    res.status(200).send({
      message: `Tìm thấy ${results.length} bài viết phù hợp`,
      total: results.length,
      data: results,
    });
  }
};

