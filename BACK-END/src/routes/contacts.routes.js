const express = require("express");
const router = express.Router();

const {
    getAllContacts,
    getContact,
    findContact,
    createContact
} = require('../controllers/contacts.controllers')


router.use(express.json())

// METODO GET 
router.get('/', getAllContacts)
// METODO GET QUERY
router.get('/search', findContact)
// METODO GET PARAMS
router.get('/:id', getContact)
// METODO POST
router.post('/', createContact)

module.exports = router;