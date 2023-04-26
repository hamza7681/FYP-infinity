const {
  addContact,
  getContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contact.controller");

const router = require("express").Router();

router.post("/add-contact", addContact);
router.get("/get-contacts", getContacts);
router.get("/get-contact/:id", getContactById);
router.delete("/delete-contact/:id", deleteContact);

module.exports = router;
