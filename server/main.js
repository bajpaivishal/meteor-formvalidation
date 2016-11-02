import { Meteor } from 'meteor/meteor';

import {Student} from '../imports/api/student';

Meteor.publish('student', function(id) {
    let find = {};
    if(id) find.userId = id;
    return Student.find(find);
});

Meteor.startup(() => {
  // code to run on server at startup
});
