// import { ObjectId } from "mongodb";
// import * as mongoDB from "mongodb";
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// // import * as dotenv from "dotenv";
var retUserSubmit = function () {
    var form_returning = document.getElementById('returning_users');
    form_returning.onsubmit = function (event) {
        event.preventDefault();
        var formData = new FormData(form_returning);
        var username = formData.get('user');
        var password = formData.get('pass');
        console.log('Username: ', username, 'Password: ', password);
    };
};
var newUserSubmit = function () {
    var form_new = document.getElementById('new_users');
    form_new.onsubmit = function (event) {
        event.preventDefault();
        var formData = new FormData(form_new);
        var username = formData.get('user');
        var password = formData.get('pass');
        console.log('Username: ', username, 'Password: ', password);
    };
};
