const { StatusCodes } = require("http-status-codes");
const Contact = require("../models/contactModel");

const contactCtrl = {
  addContact: async (req, res) => {
    try {
      const { name, email, text } = req.body;
      if (!name || !email || !text) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing fields" });
      } else {
        const newContact = new Contact({
          name,
          email,
          text,
        });
        await newContact.save();
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Thanks for contacting us." });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      if (contacts.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No contacts found!" });
      } else {
        return res.status(StatusCodes.OK).json(contacts);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getContactById: async (req, res) => {
    try {
      const id = req.params.id;
      const contact = await Contact.findById(id);
      if (contact) {
        return res.status(StatusCodes.OK).json(contact);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No Contact found against this id!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteContact: async (req, res) => {
    try {
      const id = req.params.id;
      await Contact.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Contact deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = contactCtrl;
