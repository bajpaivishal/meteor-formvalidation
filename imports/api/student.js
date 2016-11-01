import {Mongo} from 'meteor/mongo';

export const Student = new Mongo.Collection('students');

Meteor.methods({
    'insertStudent' : function (student) {
        return Student.insert(student);
    }
});
