const router = require("express").Router();
const { addExpense, getExpenses } = require("../controllers/expenseController");

router.post("/", addExpense);
router.get("/:userId", getExpenses);

module.exports = router;