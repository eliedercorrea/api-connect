const express = require('express');
const router = express.Router();

const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  replaceUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', listUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', replaceUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
