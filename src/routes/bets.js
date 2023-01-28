const express = require("express");
const betSchema = require("../models/bets");

const router = express.Router();

// create bet
router.post("/bets", (req, res) => {
    const bet = betSchema(req?.body);
    bet
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get all bets
router.get("/bets", (req, res) => {
    betSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get a bet
router.get("/bets/:id", (req, res) => {
    const { id } = req.params;
    betSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// delete a bet
router.delete("/bets/:id", (req, res) => {
    const { id } = req.params;
    betSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// update a bet
router.put("/bets/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    betSchema
        .updateOne({ _id: id }, { $set: { name, age, email } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;