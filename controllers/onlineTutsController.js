const studentUser = require("../models/studentSignup");
const facultyUser = require("../models/facultySignup");
const tutorial = require("../models/tutorials");

const handleTutsErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        title: '',
        source: '',
        description: ''
 
    };

    if(err.code === 11000){
        errors.title = "This tutorial has already been added";
        return errors;
    }

    if( err.message.includes('tutorial validation failed') || err.message.includes("Validation failed") ){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

module.exports.faculty_tuts_get = (req, res) => {
    res.render('facultyTuts');
}

module.exports.faculty_tuts_add_get = (req, res) => {
    res.render('addTutorial');
}

module.exports.faculty_tuts_add_post = async (req, res) => {
    const { title, course, semester, source, description } = req.body;

    try{
        const tuts = await tutorial.create({ title, course, semester, source, description });
        res.status(201).json({ tuts: tuts._id });
    }
    catch (err) {
        const errors = handleTutsErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.imtech_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("imtech", { tutorials });
        }
    });
}

module.exports.mtech_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mtech", { tutorials });
        }
    });
}
module.exports.mca_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mca", { tutorials });
        }
    });
}
module.exports.imsc_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("imsc", { tutorials });
        }
    });
}
module.exports.mscmaths_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mscMaths", { tutorials });
        }
    });
}
module.exports.mscphysics_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mscPhysics", { tutorials });
        }
    });
}
module.exports.mscchemistry_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mscChemistry", { tutorials });
        }
    });
}
module.exports.mscbiology_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mscLifeSciences", { tutorials });
        }
    });
}
module.exports.bba_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("bba", { tutorials });
        }
    });
}
module.exports.mba_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("mba", { tutorials });
        }
    });
}
module.exports.ima_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("ima", { tutorials });
        }
    });
}
module.exports.maeconomics_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("maEconomics", { tutorials });
        }
    });
}
module.exports.maartscomm_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("maArtsCommunication", { tutorials });
        }
    });
}
module.exports.masocialsc_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("maSocialSciences", { tutorials });
        }
    });
}
module.exports.mahumanities_get = (req, res) => {
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("maHumanities", { tutorials });
        }
    });
}

module.exports.tuts_delete_post = (req, res) => {
    tutorial.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/faculty/tutorials/"+req.params.course);
        }
    });
}


module.exports.edit_tutorial_get = (req, res) => {
    tutorial.findById(req.params.id, function(err, tut){
        if(err){
            console.log(err);
        }
        else{
            res.render("editTutorial", { tut });
        }
    });
}

module.exports.edit_tutorial_post = async (req, res) => {
    const { title, course, semester, source, description } = req.body;
    try{
        const tuts = await tutorial.findByIdAndUpdate(req.params.id, { title, course, semester, source, description }, {runValidators: true});
        res.status(200).json({ tuts: tuts._id });

    }
    catch (err){
        const errors = handleTutsErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.student_tuts_get = (req, res) => {
    // res.render('studentTuts');
    tutorial.find({}, function(err, tutorials){
        if(err){
            console.log(err);
        }
        else{
            res.render("studentTuts", { tutorials });
        }
    });
}