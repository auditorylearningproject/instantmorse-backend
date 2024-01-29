// import { ObjectId } from "mongodb";
// import * as mongoDB from "mongodb";
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import * as dotenv from "dotenv";

interface UserForm {
    user: string;
    pass: string;
}

const retUserSubmit = (): void => {
    const form_returning = document.getElementById('returning_users') as HTMLFormElement;
    form_returning.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form_returning);
        const username = formData.get('user');
        const password = formData.get('pass');
        console.log('Username: ', username, 'Password: ', password);
    };
};

const newUserSubmit = (): void => {
    const form_new = document.getElementById('new_users') as HTMLFormElement;
    form_new.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form_new);
        const username = formData.get('user');
        const password = formData.get('pass');
        console.log('Username: ', username, 'Password: ', password);
    };
};