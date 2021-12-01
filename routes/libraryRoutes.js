const { Router } = require('express');

const libraryController = require('../controllers/libraryController');

const router = Router();

// router.get('/ssignup', libraryController.student_signup_get);
// router.post('/ssignup', libraryController.student_signup_post);

// router.get('/fsignup', libraryController.faculty_signup_get);
// router.post('/fsignup', libraryController.faculty_signup_post);

// router.get('/asignup', libraryController.admin_signup_get);
// router.post('/asignup', libraryController.admin_signup_post);

// router.get('/login', libraryController.login_get);
// router.post('/login', libraryController.login_post);

router.get('/student', libraryController.student_home_get);
router.get('/faculty', libraryController.faculty_home_get);

router.get('/admin', libraryController.admin_get);
router.post('/admin/delete/:id', libraryController.admin_post);

// router.get('/logout', libraryController.logout_get);
router.get('/student/library', libraryController.library_get);

router.get('/student/library/get-books', libraryController.library_book_get);
router.post('/student/library/getbooks/:title/:userID/:source', libraryController.library_book_post);
router.post('/student/library/return-book/:title/:userID', libraryController.library_book_return_post);


router.get('/faculty/library', libraryController.library_get);

router.get('/faculty/library/get-books', libraryController.library_book_get);
router.post('/faculty/library/getbooks/:title/:userID/:source', libraryController.library_book_post1);
router.post('/faculty/library/return-book/:title/:userID', libraryController.library_book_return_post1);



router.get('/admin/add-books', libraryController.add_books_get);
router.post('/admin/add-books', libraryController.add_books_post);

router.get('/admin/edit-book/:id', libraryController.edit_book_get);
router.post('/admin/edit-book/:id', libraryController.edit_book_post);

module.exports = router;

