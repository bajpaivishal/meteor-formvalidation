import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

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

Meteor.methods({
    'insertStudent': function (student) {
        console.log(student,"<><><><><><>")

        return Student.insert(student);
    },
    'findOneStudent': function (id) {
        console.log(id,"<><><><><><>")
        return Student.find(id);
    },
    'updateStudent': function (student,id) {
        console.log(id,student,"<><><><><><>")
        return Student.update({_id:id},{ $set: student});
    },
    'deleteStudent': function (id) {
        // console.log(id,student,"<><><><><><>")
        return Student.remove({_id:id});
    }
});

Student.allow({
    insert: function(userID, doc){
        return !!userID;
    },
    update: function(userID, doc){
        return !!userID;
    },
    remove: function(userID, doc){
        return !!userID;
    }
});
