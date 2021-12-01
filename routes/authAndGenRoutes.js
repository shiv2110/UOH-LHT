const { Router } = require('express');

const authAndGenController = require('../controllers/authAndGenController');

const router = Router();

router.get("/contactus", authAndGenController.contactus_get);
router.post("/contactus", authAndGenController.contactus_post);

router.get("/aboutus", authAndGenController.aboutus_get);

// router.get("/setPassword", authAndGenController.set_passwd_get);
// router.post("/setPassword", authAndGenController.set_passwd_post);



router.get('/ssignup', authAndGenController.student_signup_get);
router.post('/ssignup', authAndGenController.student_signup_post);

router.get('/fsignup', authAndGenController.faculty_signup_get);
router.post('/fsignup', authAndGenController.faculty_signup_post);

router.get('/asignup', authAndGenController.admin_signup_get);
router.post('/asignup', authAndGenController.admin_signup_post);

router.get('/login', authAndGenController.login_get);
router.post('/login', authAndGenController.login_post);

router.get('/logout', authAndGenController.logout_get);

module.exports = router;