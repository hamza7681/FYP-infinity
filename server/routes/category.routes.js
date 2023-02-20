const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/add-category", auth, addCategory);
router.get("/get-category", getCategories);
router.patch("/update-category/:id", auth, updateCategory);
router.delete("/delete-category/:id", auth, deleteCategory);

module.exports = router;
