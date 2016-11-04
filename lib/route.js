FlowRouter.route('/', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "addStudent" });
    },
    name: "home",
    triggersEnter: [function(context, redirect) {
    if(!Meteor.userId()){
        redirect('/login')
    }
}]
});

FlowRouter.route('/list/:all?', {
    action: function (params, queryParams) {
        FlowLayout.render('body', {top: "menu", main: "studentList"});
    },
    name: "student.list"/*,
    subscriptions: function (params, queryParams) {
        console.log(params,"params");
        if(params.all == 'all'){
            this.register('students', Meteor.subscribe('student') );
        }else
            this.register('students', Meteor.subscribe('student',Meteor.userId()) );
        // FlowRouter.subsReady('students');  you can check subscrition in view part
    }*/
});


FlowRouter.route('/login', {
    action: function(params, queryParams) {
        FlowLayout.render('body', { top: "menu",  main: "login" });
    },
    name: "login",
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()){
            redirect('/')
        }
    }]
});

FlowRouter.route('/register', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "register" });
    },
    name: "register",
    triggersEnter: [function(context, redirect) {
    if(Meteor.userId()){
        redirect('/')
    }
    }]
});

FlowRouter.route('/edit/:id?', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "editStudent", id : params.id });
    },
    name: "edit",
    subscriptions: function (params, queryParams) {
        if(params.id){
            this.register('students', Meteor.subscribe('studentEdit',params.id) );
        }else{
            console.log("Id not found...")
            FlowRouter.go("home")
        }
    },
    triggersEnter: [function(context, redirect) {
        if(!Meteor.userId()){
            redirect('/')
        }
    }]
});


