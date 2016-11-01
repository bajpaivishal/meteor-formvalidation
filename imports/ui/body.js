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
        }
        let id = Student.insert(student);
console.log("submitted...",id);
event.preventDefault();
}
});
