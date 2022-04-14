"use strict";

const express = require("express");
const app = express();
const { items } = require("./fakeDb");

const router = new express.Router();

/** Return list list of shopping items */
router.get("/", function (req, res) {
  return res.json({ items: items });
});

/** Creates a new item and return that item */
router.post("/", function (req, res) {
  let item = req.body;
  items.push(item);

  return res.json({ added: item });
});

/** return single item */
router.get("/:name", function (req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }
  }
});

/** accept JSON body, modify item, return it */
router.patch("/:name", function (req, res) {
  let item = req.body;

  for (let i = 0; i < items.length; i++) {
    if (items[i].name === req.params.name) {
      items[i] = item;
      return res.json({ updated: items[i] });
    }
  }
});

/** DELETE item */
router.delete("/:name", function (req, res) {
  // for (let item of items) {
  //   if (item.name === req.params.name) {
  //     return res.json({ updated: dbItem });
  //   }
  // }
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === req.params.name) {
      items.splice(i, 1);
      break;
    }
  }
  return res.json({ message: "Deleted" });
});

module.exports = router;
