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
        allowedValues: ["Male", "Female"]
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
