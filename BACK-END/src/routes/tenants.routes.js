const express = require("express");
const router = express.Router();
const tenantsControllers = require('../controllers/tenants.controllers')

router.use(express.json());

router.post('/', tenantsControllers.createTenant);

module.exports = router;