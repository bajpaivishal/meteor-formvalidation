import {Template} from 'meteor/templating';
import {Student} from '../api/student';

import './body.html';

Template.addStudent.onCreated(function addStudentOnCreated() {

});

Template.addStudent.helpers({});

Template.addStudent.events({
        'submit #addStudentForm': (event, instance)=> {
        let student = {
            email: event.target.name.value,
            name: event.target.email.value,
            course: event.target.course.value,
            gender: event.target.gender.value,
            userId:Meteor.userId()
        }
        let id = Meteor.call('insertStudent',student,(e,data)=>{
                console.log("submitted...",data);

});
        // let id = Student.insert(student);
event.preventDefault();
}
});



Template.studentList.helpers({
    students: ()=> Student.find()
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
            FlowRouter.go('home');
        });
        event.preventDefault();
    }
});



Template.login.events({
        'submit #loginForm': (event)=> {
        let emailVar = event.target.email.value,
        passwordVar = event.target.password.value;
    Meteor.loginWithPassword(emailVar, passwordVar,()=>{
        FlowRouter.go('home');
    });
    event.preventDefault();
}
});

Template.menu.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout(function () {
            FlowRouter.go('/login');
        });

    }
});

