import {Template} from 'meteor/templating';
// import {Student} from '../api/student';
// import  '../api/student';

/*Meteor.methods({
    'insertStudent': function (student) {
        console.log(student,"<><><><><><>")

        return Student.insert(student);
    },
    'findOneStudent': function (id) {
        console.log(id,"<><><><><><>")
        return Student.find(id);
    },
});*/
Student = new Mongo.Collection('students');

StudentSchema = new SimpleSchema({
    name: {
        type: String,
        max: 8
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        unique: true
    },
    course: {
        type: String,
    },
    gender: {
        type: String,
    },
    userId: {
        type: String,
    },/*,
     subjects: {
     type: Array
     },
     "subjects.$": {
     type: String
     }*/
});
SimpleSchema.messages({
    regEx: [
        {exp: SimpleSchema.RegEx.Email, msg: "[label] must... be a valid e-mail address"},
    ]
});
Student.attachSchema(StudentSchema);


import './body.html';

Template.addStudent.onCreated(function addStudentOnCreated() {
});

Template.addStudent.helpers({
    'course':  () => {
        return {
            'MCA':'MCA',
            'BCA':'BCA',
        };
    },
    'gender':  () => {
        return {
            'Male':'Male',
            'Female':'Female',
        };
    }
});

Template.addStudent.events({
        'submit #addStudentForm': (event, instance)=> {
        let student = {
            email: event.target.email.value,
            name: event.target.name.value,
            course: event.target.course.value,
            gender: event.target.gender.value,
            userId:Meteor.userId()
        }
        // StudentSchema.validate(student);
        let id = Meteor.call('insertStudent',student,(err,data)=>{
                if(err){
                    console.log("submitted...", err);
                    FlashMessages.sendError("oops !! Something went wrong.", { hideDelay: 2000 });
                }else{
                    FlashMessages.sendSuccess("Student Info added successfuly.", { hideDelay: 2000 });
                    FlowRouter.go('/list');
                    // console.log("submitted...", data);
                }

            });
        // let id = Student.insert(student);
        event.preventDefault();
        }

},

);



Template.studentList.helpers({
    students: ()=> Student.find()
});

Template.studentList.events({
    'click .remove': function (event,instance) {
        console.log(this._id,"<<")
        Meteor.call('deleteStudent',this._id);
    }
});
Template.studentList.onCreated(function () {
    var self = this;
    self.subscribe("student",Meteor.userId());
});


Template.register.events({
        'submit #registrationForm': (event)=> {
        let userInfo = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        Accounts.createUser(userInfo,()=>{
            FlashMessages.sendSuccess("User registered successfuly.", { hideDelay: 2000 });
            FlowRouter.go('home');
        });
        event.preventDefault();
    }
});



Template.login.events({
        'submit #loginForm': (event)=> {
        let emailVar = event.target.email.value,
        passwordVar = event.target.password.value;
    Meteor.loginWithPassword(emailVar, passwordVar,(err,data)=>{
        if(err){
            FlashMessages.sendError("oops !! Something went wrong.", { hideDelay: 2000 });
        }else{
            FlashMessages.sendSuccess("User Loggin successfuly.", { hideDelay: 2000 });
            FlowRouter.go('home');
        }

    });
    event.preventDefault();
}
});

Template.menu.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout(function () {
            FlashMessages.sendSuccess("Logged-out successfuly", { hideDelay: 2000 });
            FlowRouter.go('/login');
        });

    }
});


Template.editStudent.helpers({
        'course':  () => {
        return {
            'MCA':'MCA',
            'BCA':'BCA',
        };
},
'gender':  () => {
    return {
        'Male':'Male',
        'Female':'Female',
    };
},
'student':  () => Student.findOne(FlowRouter.current().params.id)
});



Template.editStudent.events({
        'submit #editStudentForm': (event, instance)=> {
        let id = FlowRouter.current().params.id;
        let student = {
            email: event.target.email.value,
            name: event.target.name.value,
            course: event.target.course.value,
            gender: event.target.gender.value,
            userId:Meteor.userId()
        }
        // StudentSchema.validate(student);
        Meteor.call('updateStudent',student,id,(err,data)=>{
                if(err){
                    console.log("Error on update...", err);
                    FlashMessages.sendError("oops !! Something went wrong.", { hideDelay: 2000 });
                }else{
                    FlashMessages.sendSuccess("Student Info Updated successfuly.", { hideDelay: 2000 });
FlowRouter.go('/list');
// console.log("submitted...", data);
}

});
// let id = Student.insert(student);
event.preventDefault();
}
});