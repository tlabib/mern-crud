const express = require('express');

const {
 getUsers,
 getAllTasks,
 deleteTaskAdmin,
 updateUser
} = require('../controllers/adminController');

const {protect} = require('../middleware/authMiddleware');

const admin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get(
 '/users',
 protect,
 admin,
 getUsers
);

router.get(
 '/tasks',
 protect,
 admin,
 getAllTasks
);
router.put(
 '/user/:id',
 protect,
 admin,
 updateUser
);

router.delete(
 '/task/:id',
 protect,
 admin,
 deleteTaskAdmin
);

module.exports = router;