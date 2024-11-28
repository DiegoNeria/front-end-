const express = require("express");
const router = express.Router();


const {
    createUser,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/users.controllers')


router.use(express.json())

//METODO GET
router.get('/', getUser)

// METODO POST
router.post('/', createUser)

//METODO DELETE
router.delete('/:id', deleteUser)

//METODO UPDATE
router.put('/:id', updateUser )

module.exports = router;