const studentUser = require("../models/studentSignup");
const facultyUser = require("../models/facultySignup");
const hostelR = require("../models/hostels");

const handleHostelErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        name: '',
        warden: '',
        nRooms: '',
        email: '',
        phone: ''
 
    };

    if(err.code === 11000){
        errors.name = "The Hostel with this name already exists";
        return errors;
    }

    if( err.message.includes('failed')  ){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

module.exports.add_hostel_get = (req, res) => {
    res.render("addHostel");
}

module.exports.add_hostel_post = async (req, res) => {
    const { name, warden, hostelFor, nRooms, email, phone } = req.body;

    try{
        const hostel = await hostelR.create({ name, warden, hostelFor, nRooms, email, phone });
        res.status(201).json({ hostel: hostel._id });
    }
    catch (err) {
        const errors = handleHostelErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.admin_get = (req, res) => {
    hostelR.find({}, function(err, hostels){
        if(err){
            console.log(err);
        }
        else{
            res.render("adminHostel", { hostels });
        }
    });
}

module.exports.edit_hostel_get = (req, res) => {
    hostelR.findById(req.params.id, function(err, hostel){
        if(err){
            console.log(err);
        }
        else{
            res.render("editHostel", { hostel });
        }
    });
}

module.exports.edit_hostel_post = async (req, res) => {
    const { name, warden, hostelFor, phone, available } = req.body;
    try{
        const hostel = await hostelR.findByIdAndUpdate(req.params.id, { name, warden, hostelFor, phone, areAvailable: available } , {runValidators: true});
        res.status(200).json({ hostel: hostel._id });

    }
    catch (err){
        const errors = handleHostelErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.hostel_get = (req, res) => {
    // res.render("studentHostel");
    hostelR.find({}, function(err, hostels){
        if(err){
            console.log(err);
        }
        else{
            res.render("studentHostel", { hostels });
        }
    });
}

module.exports.hostel_room_get = (req, res) => {
    res.render("getRoom");
}

module.exports.hostel_room_post = (req, res) => {
    const { regno, guardian, guardianPhone, bloodGroup, gender, medicalConcerns } = req.body;

    
        var roomNo = -1;
        var hostelType = "";
        if(gender == "Female"){
            const lHostels = hostelR.find({hostelFor: "Women"}, async function(err, h){
                var lh = JSON.parse(JSON.stringify(h));
                for(let i = 0; i < lh.length; i++){
                    if(lh[i].areAvailable.length > 0){
                        roomNo = lh[i].areAvailable.pop();
                        hostelType = lh[i].name;
                        break;
                    }
                }
                
                const room = await hostelR.findOneAndUpdate({ name: hostelType }, { $pull: { areAvailable: roomNo } });
                const student = studentUser.findOneAndUpdate({ regno }, { hostel: {guardian, guardianPhone, bloodGroup, gender, hostelType, roomNo, medicalConcerns} },
                function(err){
                    if(err){
                        throw err;
                    }
                    else{
                        res.redirect("/student/hostel");
                    }
                });
               

            });


        }
        else if(gender == "Male"){
            const mHostels = hostelR.find({hostelFor: "Men"}, async function(err, h){
                var mh = JSON.parse(JSON.stringify(h));
                for(let i = 0; i < mh.length; i++){
                    if(mh[i].areAvailable.length > 0){
                        roomNo = mh[i].areAvailable.pop();
                        hostelType = mh[i].name;
                        break;
                    }
                }
               
                const room = await hostelR.findOneAndUpdate({ name: hostelType }, { $pull: { areAvailable: roomNo } });

                const student = studentUser.findOneAndUpdate({ regno }, { hostel: {guardian, guardianPhone, bloodGroup, gender, hostelType, roomNo, medicalConcerns} },
                function(err){
                    if(err){
                        throw err;
                    }
                    else{
                        res.redirect("/student/hostel");
                    }
                });
 
            });
            
            
        }  
}

module.exports.hostel_vacate_get = (req, res) => {
    res.render('vacateHostel');
}

module.exports.hostel_vacate_post = async (req, res) => {
    // res.render('vacateHostel');
    const { regno, hostelType, roomNo } = req.body;

    // try{
        // console.log("in here");
        const room = await hostelR.findOneAndUpdate({ name: hostelType }, { $push: { areAvailable: roomNo } });

        const student = studentUser.findOneAndUpdate( { regno }, { hostel: {} },
            function(err){
                if(err){
                    throw err;
                }
                else{
                    res.redirect("/student/hostel");
                }
            });
    // }
    // catch(err){
    //     res.status(400).json({ regno });
    // }
        // );
}

module.exports.faculty_tuts_get = (req, res) => {
    res.render('facultyTuts');
}