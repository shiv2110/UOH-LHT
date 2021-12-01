const jwt = require('jsonwebtoken');
const studentUser = require("../models/studentSignup");
const facultyUser = require("../models/facultySignup");
const adminUser = require("../models/adminSignup");
// const book = require("../models/books");
// const libraryUser = require("../models/libraryUsers");



const requireAuthStudent = (req, res, next) => {
    const token = req.cookies.jwtStudent;

    if (token) {
        jwt.verify(token, 'uohlht secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

const requireAuthFaculty = (req, res, next) => {
    const token = req.cookies.jwtFaculty;

    if (token) {
        jwt.verify(token, 'uohlht secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

const requireAuthAdmin = (req, res, next) => {
    const token = req.cookies.jwtAdmin;

    if (token) {
        jwt.verify(token, 'uohlht secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

const checkStudent = (req, res, next) => {
    const token = req.cookies.jwtStudent;
    if (token) {
      jwt.verify(token, 'uohlht secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await studentUser.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
}

const checkFaculty = (req, res, next) => {
  const token = req.cookies.jwtFaculty;
  if (token) {
    jwt.verify(token, 'uohlht secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await facultyUser.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

// const checkStudentLibrary = (req, res, next) => {
//   const token = req.cookies.jwtStudent;
//   if (token) {
//     jwt.verify(token, 'uohlht secret', async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await libraryUser.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// }

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwtAdmin;
    if (token) {
      jwt.verify(token, 'uohlht secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await adminUser.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
}

// var books = [];

// const listBooks = (req, res, next) => {
  
//   books = await book.find({});
//   // res.locals.books = books;
//   next();
// }

module.exports = { requireAuthStudent, requireAuthFaculty, requireAuthAdmin, checkStudent, checkAdmin, checkFaculty };