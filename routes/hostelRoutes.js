const { Router } = require('express');

const hostelController = require('../controllers/hostelController');

const router = Router();


router.get('/admin1/add-hostel', hostelController.add_hostel_get);
router.post('/admin1/add-hostel', hostelController.add_hostel_post);

router.get('/admin1', hostelController.admin_get);

router.get('/admin1/edit-hostel/:id', hostelController.edit_hostel_get);
router.post('/admin1/edit-hostel/:id', hostelController.edit_hostel_post);

router.get('/student/hostel', hostelController.hostel_get);
router.get('/student/hostel/get-room', hostelController.hostel_room_get);
router.post('/student/hostel/get-room', hostelController.hostel_room_post);

router.get('/student/hostel/vacate', hostelController.hostel_vacate_get);
router.post('/student/hostel/vacate', hostelController.hostel_vacate_post);

router.get('/faculty/tutorials', hostelController.faculty_tuts_get);



// router.post('/student/hostel/get-room', hostelController.hostel_room_post);









module.exports = router;