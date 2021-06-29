const client = require("../../elasticsearch/connection");
const Post = require("../../models/Post");
const KEY_INDEX = "post";
module.exports.searchv2 = async (req, res) => {
  const { page, keySearch } = req.params;
  const pageSize = 10;

  const searchParams = {
    index: KEY_INDEX,
    // type: "employee",
    from: (page - 1) * pageSize,
    size: pageSize,
    body: {
      query: {
        match: {
          // about: keySearch,
          title: keySearch,
        },
      },
    },
  };

  const result = await client.search(searchParams).then(
    function(body) {
      const hits = body;
      return hits.hits;
    },
    function(error) {
      console.trace(error.message);
    }
  );

  if (!result) res.status(404).send({});
  res.send(result);
};

module.exports.syncES = async (req, res) => {
  res.send("In sync...");

  // Create indices
  const existIndex = await client.indices.exists({
    index: KEY_INDEX,
  });

  if (existIndex) {
    await client.indices.delete({
      index: KEY_INDEX,
    });
  } else {
    await client.indices.create(
      {
        index: KEY_INDEX,
        body: {
          mappings: {
            properties: {
              id: { type: "text" },
              title: { type: "text" },
              nameUrl: { type: "text" },
              img: { type: "text" },
              category: { type: "text" },
              views: { type: "text" },
              tags: { type: "text" },
              summary: { type: "text" },
              createAd: { type: "text" },
            },
          },
        },
      },
      { ignore: [400] }
    );
  }

  await client.index({
    index: KEY_INDEX,
    body: {
      id: "198398210938123",
      title: "Winter is coming. 2",
    },
  });
  const allPost = await Post.find();
  const listPost = allPost.map((item) => {
    return {
      id: item._id,
      title: item.title,
      nameUrl: item.nameUrl,
      img: item.img,
      category: item.category,
      views: item.views,
      tags: item.tags,
      summary: item.summary,
      createAd: item.createAd,
    };
  });
  const body = listPost.reduce(
    (acc, doc) => acc.concat([{ index: { _index: KEY_INDEX } }, doc]),
    []
  );
  const setData = await client.bulk({ refresh: true, body });
};
