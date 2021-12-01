const studentUser = require("../models/studentSignup");
const facultyUser = require("../models/facultySignup");
const adminUser = require("../models/adminSignup");
const query = require("../models/queries");
const bcrypt = require('bcrypt');


const jwt = require("jsonwebtoken");

const handleStudentErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        fullname: '',
        regno: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    };

    if(err.code === 11000){
        errors.regno = "The Registration Number you provided already exists";
        return errors;
    }

    if(err.message.includes('studentuser validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

const handleFacultyErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        fullname: '',
        facultyid: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    };

    if(err.code === 11000){
        errors.facultyid = "The Faculty ID you provided already exists";
        return errors;
    }

    if(err.message.includes('facultyuser validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

const handleAdminErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        fullname: '',
        adminid: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    };

    if(err.code === 11000){
        errors.adminid = "The Admin ID you provided already exists";
        return errors;
    }

    if(err.message.includes('adminuser validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

const handleQueryErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        name: '',
        email: '',
        message: ''
    };

    // if(err.code === 11000){
    //     errors.adminid = "The Admin ID you provided already exists";
    //     return errors;
    // }

    if(err.message.includes('query validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        username: '',
        password: ''
    };

    if(err.message === "Incorrect username"){
        errors.username = "Username not registered!";
    }
    if(err.message === "Incorrect password"){
        errors.password = "Incorrect password!";
    }

    return errors;

}

// const handlePasswdSetErrors = (err) => {
//     console.log(err.message, err.code);
//     let errors = {
//         username: '',
//     };

//     errors.username = "Username not registered!";
    
//     return errors;

// }


const maxAge = 3 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'uohlht secret', {
        expiresIn: maxAge
    });
}

module.exports.contactus_get = (req, res) => {
    res.render("contactUs");
}

module.exports.aboutus_get = (req, res) => {
    res.render("aboutUs");
}

module.exports.contactus_post = async (req, res) => {
    // res.render("contactUs")
    const { name, email, message } = req.body;

    try{
        const q = await query.create({ name, email, message });
        res.status(201).json({q: q._id});
    }
    catch (err) {
        const errors = handleQueryErrors(err);
        res.status(400).json({ errors });

    }
}

// module.exports.set_passwd_get = (req, res) => {
//     res.render("setPassword");
// }

// module.exports.set_passwd_post = async (req, res) => {
//     // res.render("setPassword");
//     const { username, password } = req.body;
//     const studentRegex = /^[1-3][0-9][a-z]{4}[0-9]{2}$/;
//     const facultyRegex = /^[0-9]{4}$/;
//     const adminRegex = /^[0-9a-zA-Z@_]{7}$/;

//     try{
//         var password1 = "";

//         if(username.match(studentRegex)){
//             var salt = await bcrypt.genSalt();
//             password1 = await bcrypt.hash(password, salt);
//             const user = studentUser.findOneAndUpdate({ regno: username }, { password: password1 }, 
//                 function(err){
//                     if(err){
//                         throw err;
//                     }
//                     else{
//                         res.redirect("/login");
//                     }
//                 });
//         }
//         else if(username.match(facultyRegex)){
//             var salt = await bcrypt.genSalt();
//             password1 = await bcrypt.hash(password, salt);
//             const user = facultyUser.findOneAndUpdate({ facultyid: username }, { password: password1 }, 
//             function(err){
//                 if(err){
//                     throw err;
//                 }
//                 else{
//                     res.redirect("/login");
//                 }
//             });

//         }
//         else{
//             var salt = await bcrypt.genSalt();
//             password1 = await bcrypt.hash(password, salt);
//             const user = adminUser.findOneAndUpdate({ adminid: username }, { password: password1 }, 
//                 function(){
//                     res.redirect("/login");
//                 });
//         }
//     }
//     catch(err){
//         const errors = handlePasswdSetErrors(err);
//         res.status(400).json({ errors });
//     }
// }



module.exports.student_signup_get = (req, res) => {
    res.render("studentSignup");
}

module.exports.faculty_signup_get = (req, res) => {
    res.render("facultySignup");
}

module.exports.login_get = (req, res) => {
    if( (!req.cookies.jwtStudent) && (!req.cookies.jwtFaculty) && (!req.cookies.jwtAdmin) ){
        res.render("login");
    }
    else{
        if(req.cookies.jwtStudent){
            res.redirect('/student');
        }
        else if(req.cookies.jwtFaculty){
            res.redirect('/faculty');
        } 
        else if(req.cookies.jwtAdmin){
            res.redirect('/admin');
        }        
    }
}

module.exports.student_signup_post = async (req, res) => {
    const { fullname, course, semester, regno, email, password, phone, address } = req.body;

    try{
        const user = await studentUser.create({ fullname, course, semester, regno, email, password, phone, address });
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch (err) {
        const errors = handleStudentErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.faculty_signup_post = async (req, res) => {
    const { fullname, department, facultyid, email, password, phone, address } = req.body;

    try{
        const user = await facultyUser.create({ fullname, department, facultyid, email, password, phone, address });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleFacultyErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    try{
        const studentRegex = /^[1-3][0-9][a-z]{4}[0-9]{2}$/;
        const facultyRegex = /^[0-9]{4}$/;
        const adminRegex = /^[0-9a-zA-Z@_]{7}$/;

        if(username.match(studentRegex)){
            const user = await studentUser.login(username, password);
            const token = createToken(user._id);
            res.cookie('jwtStudent', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json({ user: user._id });
            }
        else if(username.match(facultyRegex)){
            const user = await facultyUser.login(username, password);
            const token = createToken(user._id);
            res.cookie('jwtFaculty', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json({ user: user._id });
        }
        else{
            const user = await adminUser.login(username, password);
            const token = createToken(user._id);
            res.cookie('jwtAdmin', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json({ user: user._id });

        }
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.logout_get = (req, res) => {
    if(req.cookies.jwtStudent){
        res.cookie('jwtStudent', '', { maxAge: 1 });
        res.redirect('/login');
    }
    else if(req.cookies.jwtFaculty){
        res.cookie('jwtFaculty', '', { maxAge: 1 });
        res.redirect('/login');
    }
    else if(req.cookies.jwtAdmin){
        res.cookie('jwtAdmin', '', { maxAge: 1 });
        res.redirect('/login');
    }
}

module.exports.admin_signup_get = (req, res) => {
    res.render("adminSignup");
}


module.exports.admin_signup_post = async (req, res) => {
    const { fullname, adminFor, adminid, email, password, phone, address } = req.body;

    try{
        const user = await adminUser.create({ fullname, adminFor, adminid, email, password, phone, address });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleAdminErrors(err);
        res.status(400).json({ errors });

    }
}