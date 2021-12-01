const { Router } = require('express');

const onlineTutsController = require('../controllers/onlineTutsController');

const router = Router();


router.get('/faculty/tutorials', onlineTutsController.faculty_tuts_get);

router.get('/faculty/tutorials/add-tuts', onlineTutsController.faculty_tuts_add_get);
router.post('/faculty/tutorials/add-tuts', onlineTutsController.faculty_tuts_add_post);

router.get('/faculty/tutorials/imtech', onlineTutsController.imtech_get);
router.get('/faculty/tutorials/mtech', onlineTutsController.mtech_get);
router.get('/faculty/tutorials/mca', onlineTutsController.mca_get);
router.get('/faculty/tutorials/imsc', onlineTutsController.imsc_get);
router.get('/faculty/tutorials/msc-maths', onlineTutsController.mscmaths_get);
router.get('/faculty/tutorials/msc-physics', onlineTutsController.mscphysics_get);
router.get('/faculty/tutorials/msc-chemistry', onlineTutsController.mscchemistry_get);
router.get('/faculty/tutorials/msc-life-sciences', onlineTutsController.mscbiology_get);
router.get('/faculty/tutorials/bba', onlineTutsController.bba_get);
router.get('/faculty/tutorials/mba', onlineTutsController.mba_get);
router.get('/faculty/tutorials/ima', onlineTutsController.ima_get);
router.get('/faculty/tutorials/ma-economics', onlineTutsController.maeconomics_get);
router.get('/faculty/tutorials/ma-arts-&-communication', onlineTutsController.maartscomm_get);
router.get('/faculty/tutorials/ma-social-sciences', onlineTutsController.masocialsc_get);
router.get('/faculty/tutorials/ma-humanities', onlineTutsController.mahumanities_get);


router.post('/faculty/tutorials/delete/:id/:course', onlineTutsController.tuts_delete_post);


router.get('/faculty/tutorials/edit-tutorial/:id', onlineTutsController.edit_tutorial_get);
router.post('/faculty/tutorials/edit-tutorial/:id', onlineTutsController.edit_tutorial_post);

router.get('/student/tutorials', onlineTutsController.student_tuts_get);









module.exports = router;