const express = require("express");
const BetsSchema = require("../models/bets");

const router = express.Router();

// create bet
router.post("/bets", (req, res) => {
    const bet = BetsSchema(req?.body);
    bet
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get all bets
router.get("/bets", async (req, res) => {
    try {
        const bets = await BetsSchema.find().sort({ date: -1 });
        res.json(bets);
    } catch (error) {
        res.status(500).send(error);
    }
    BetsSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get a bet
router.get("/bets/:id", (req, res) => {
    const { id } = req.params;
    BetsSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// delete a bet
router.delete("/bets/:id", (req, res) => {
    const { id } = req.params;
    BetsSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// update a bet
router.put("/bets/:id", async (req, res) => {
    const { id } = req.params;
    const { oddResult } = req.body;
    try {
        const bet = await BetsSchema.findByIdAndUpdate(id, { oddResult }, { new: true });
        res.json(bet);
    } catch (error) {
        res.json({ message: error });
        console.error(error);
    }
});

module.exports = router;