const express = require("express");
const { TopicModel } = require("../Models/Topic");
const { topicsPostApi, topicsGetApi } = require("../constants/API_ENDPOINTS");

const topicRouter = express.Router();

topicRouter.post(topicsPostApi, async (req, res) => {
  try {
    const topic = new TopicModel(req.body);

    const addedTopic = await topic.save();

    res.status(201).send({ message: "Topic added Successfully", addedTopic });
  } catch (err) {
    res.status(500).send({
      message: "Topic not added",
      error: err.message,
    });
  }
});

topicRouter.get(topicsGetApi, async (req, res) => {
  try {
    // get all topics
    const topics = await TopicModel.find({});
    res.send(topics);
  } catch (err) {
    res.status(500).send({
      message: "Failed while fetching the topics",
      error: err.message,
    });
  }
});

module.exports = { topicRouter };
