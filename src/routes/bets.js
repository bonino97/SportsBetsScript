const express = require("express");
const betSchema = require("../models/bets");
const betApiFootballSchema = require("../models/betsApiFootball");

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
router.get("/bets", async (req, res) => {
    try {
        const bets = await betSchema.find().sort({ date: 1 }).exec();
        res.json(bets);
    } catch (error) {
        console.error(error);
        return;
    }
});

// get all bets
router.get("/bets-api-football", (req, res) => {
    betApiFootballSchema
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
router.put("/bets/:id", async (req, res) => {
    const { id } = req.params;
    const { oddResult } = req.body;
    try {
        const bet = await betSchema.findByIdAndUpdate(id, { oddResult }, { new: true });
        res.json(bet);
    } catch (error) {
        res.json({ message: error });
        console.error(error);
    }
});

module.exports = router;