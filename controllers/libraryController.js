const studentUser = require("../models/studentSignup");
const facultyUser = require("../models/facultySignup");
const addBook = require("../models/books");


const handleBookErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        title: '',
        author: '',
        publication: '',
        edition: '',
        source: ''
 
    };

    if(err.code === 11000){
        errors.title = "The Book with this name already exists";
        return errors;
    }

    if( err.message.includes('book validation failed') || err.message.includes("Validation failed") ){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}


module.exports.student_home_get = (req, res) => {
    res.render("studentHome");
}

module.exports.faculty_home_get = (req, res) => {
    res.render("facultyHome");
}


module.exports.library_get = (req, res) => {
    res.render("library");
}


module.exports.admin_get = (req, res) => {
    addBook.find({}, function(err, books){
        if(err){
            console.log(err);
        }
        else{
            res.render("adminHome", { books });
        }
    });
}

module.exports.admin_post = (req, res) => {
    addBook.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/admin");
        }
    });
}

module.exports.add_books_get = (req, res) => {
    res.render("addBooks");
}

module.exports.add_books_post = async (req, res) => {
    const { title, branch, author, publication, edition, isAvailable, description, source } = req.body;

    try{
        const book = await addBook.create({ title, branch, author, publication, edition, isAvailable, description, source });
        // const token = createToken(book._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ book: book._id });
    }
    catch (err) {
        const errors = handleBookErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.edit_book_get = (req, res) => {
    addBook.findById(req.params.id, function(err, book){
        if(err){
            console.log(err);
        }
        else{
            res.render("editBook", { book });
        }
    });
}

module.exports.edit_book_post = async (req, res) => {
    const { title, branch, author, publication, edition, isAvailable, description, source } = req.body;
    try{
        const book = await addBook.findByIdAndUpdate(req.params.id, { title, branch, author, publication, edition, isAvailable, description, source }, {runValidators: true});
        res.status(200).json({ book: book._id });

    }
    catch (err){
        const errors = handleBookErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.library_book_get = (req, res) => {
    addBook.find({}, function(err, books){
        if(err){
            console.log(err);
        }
        else{
            res.render("getBook", { books });
        }
    });
}

module.exports.library_book_post = (req, res) => {
    var date = new Date();

    // const book = await addBook.findOneAndUpdate({title: req.params.title}, { isAvailable: false });
    const updateuser = studentUser.findByIdAndUpdate(req.params.userID, {$push: {books: {bookName: req.params.title, source: decodeURIComponent(req.params.source)} } },
    function(err){
        if(err){
            throw err;
        }
        else{
            res.redirect('/student/library');
        }
    });

}

module.exports.library_book_return_post = async (req, res) => {
    const book = await addBook.findOneAndUpdate({title: req.params.title}, { isAvailable: true });
    const updateuser = studentUser.findByIdAndUpdate(req.params.userID, {$pull: {books: {bookName: req.params.title} } },
    function(err){
        if(err){
            throw err;
        }
        else{
            res.redirect('/student/library');
        }
    });

}

module.exports.library_book_post1 = (req, res) => {
    var date = new Date();

    // const book = await addBook.findOneAndUpdate({title: req.params.title}, { isAvailable: false });
    const updateuser = facultyUser.findByIdAndUpdate(req.params.userID, {$push: {books: {bookName: req.params.title, source: decodeURIComponent(req.params.source)} } },
    function(err){
        if(err){
            throw err;
        }
        else{
            res.redirect('/faculty/library');
        }
    });

}

module.exports.library_book_return_post1 = async (req, res) => {
    const book = await addBook.findOneAndUpdate({title: req.params.title}, { isAvailable: true });
    const updateuser = facultyUser.findByIdAndUpdate(req.params.userID, {$pull: {books: {bookName: req.params.title} } },
    function(err){
        if(err){
            throw err;
        }
        else{
            res.redirect('/faculty/library');
        }
    });

}