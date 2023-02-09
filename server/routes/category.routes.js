const {
  addCategory,
  getCategories,
  updateCategory,
  deletCategory,
} = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/add-category", auth, addCategory);
router.get("/get-category", auth, getCategories);
router.patch("/update-category/:id", auth, updateCategory);
router.delete("/delete-category/:id", auth, deletCategory);

module.exports = router;
