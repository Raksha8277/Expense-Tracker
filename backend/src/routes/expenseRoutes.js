const router = require("express").Router();
const { addExpense, getExpenses } = require("../controllers/expenseController");

router.post("/", addExpense);
router.get("/:userId", getExpenses);

module.exports = router;

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});