const express = require('express');
const { createCompany, getCompanies } = require('../controllers/company.controller');
const auth = require('../middleware/auth.middleware');
const roleAuth = require('../middleware/roleAuth.middleware');
const router = express.Router();

router.post('/', auth, roleAuth(['Admin']), createCompany);
router.get('/', auth, getCompanies);

module.exports = router;