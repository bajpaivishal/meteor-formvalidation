import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


export const Student = new Mongo.Collection('students');

StudentSchema = new SimpleSchema({
    name: {
        type: String,
        max: 200
    },
    email: {
        type: String,
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
Student.attachSchema(StudentSchema);


Meteor.methods({
    'insertStudent': function (student) {
        return Student.insert(student);
    }
});
