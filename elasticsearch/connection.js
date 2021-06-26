const elasticsearch = require("elasticsearch");

const username = process.env.ELASTICSEARCH_USERNAME || "";
const password = process.env.ELASTICSEARCH_PASSWORD || "";
const server = process.env.ELASTICSERCH_SERVER || "localhost";
const port = process.env.ELASTICSEARCH_PORT || 9200;

const client = new elasticsearch.Client({
  nodes: [
    `https://${username}:${password}@${server}:${port}/`,
    // 'https://[username]:[password]@[server]:[port]/'
  ],
});

client.ping(
  {
    // ping usually has a 3000ms timeout
    requestTimeout: 1000,
  },
  function(error) {
    if (error) {
      console.trace("Elasticsearch cluster is down!");
    } else {
      console.log("Elasticsearch cluster is well");
    }
  }
);

module.exports = client;
