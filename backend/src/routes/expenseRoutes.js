const router = require("express").Router();
const Expense = require("../models/Expense");


router.post("/", async (req, res) => {
  try {
    const { amount, category, type } = req.body;

    const newExpense = new Expense({
      amount,
      category,
      type
    });

    const saved = await newExpense.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding transaction" });
  }
});


router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating" });
  }
});

module.exports = router;