import { Meteor } from 'meteor/meteor';

import  '../imports/api/student';

Meteor.publish('student', function(id) {
    let find = {};
    if(id) find.userId = id;
    return Student.find(find);
});
Meteor.publish('studentEdit', function(id) {
    let find = {};
    if(id) find._id = id;
    return Student.find(find);
});

Meteor.startup(() => {
  // code to run on server at startup
});
