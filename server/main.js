import { Meteor } from 'meteor/meteor';

import {Student} from '../imports/api/student';

Meteor.publish('students', function(id) {
    return Student.find({userId:id});
});

Meteor.startup(() => {
  // code to run on server at startup
});
