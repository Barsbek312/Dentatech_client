/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
/* eslint-disable */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail', // или другой почтовый сервис
    auth: {
        user: 'dentatech16@gmail.com',
        pass: 'GPT4FIP14'
    }
});



exports.userEmailVerified = functions.auth.user().onUpdate(async (change, context) => {
    const newUser = change.after;
    const prevUser = change.before;

    if (!prevUser.emailVerified && newUser.emailVerified) {
        // Email только что был подтвержден
        return admin.firestore().collection('users').doc(newUser.email).update({
            emailVerified: true
        });
    } else {
        return null;
    }
});

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onUserEmailVerified = functions.firestore.document('users/{userId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();

        if (!previousValue.emailVerified && newValue.emailVerified) {
            // Если email только что был подтвержден
            if (newValue.status === 'personal') {
                // Генерируем и отправляем письмо для сброса пароля
                const link = await admin.auth().generatePasswordResetLink(newValue.email);
                
                const mailOptions = {
                    from: 'your_email@gmail.com',
                    to: newValue.email,
                    subject: 'Сброс пароля',
                    text: 'Сбросьте ваш пароль, перейдя по следующей ссылке: ' + link
                };
                
                return transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Ошибка отправки письма:', error);
                    } else {
                        console.log('Письмо отправлено:', info.response);
                    }
                });
            }
        }
    });




// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
