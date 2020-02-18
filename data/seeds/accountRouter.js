const express = require("express");

// database access using knex
const db = require("../dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  //Get list of accounts
  db.select("*")
    .from("accounts")
    .orderBy("budget")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed from server" });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      db("accounts")
        .where("id", ids[0])
        .then(account => {
          res.status(201).json(account);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to post from server" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(changes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to update from server" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete from server" });
    });
});

module.exports = router;
