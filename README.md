# Sticky-Messages
A full-stack app that users can post sticky-messages to each other 
Deployed Version: https://sticky-messages.herokuapp.com/

## Project Overview
This is a full-stack project that uses Node.js, Express, and Mongoose to deploy a server with MongoDB database with User and Message models. This project uses React for frontend, with some reactstrap for modal. The communication between client and server is done through Axios. This project features login, saving user's username and password with bcrypt encryption to database. For authentification of user, JWT tokens are used. Each messages contain sender, receiver, title and body to facilitate communication between users.  For the frontend, the project is styled to look like a post board with sticky notes, hence title sticky-messages.

## Project Usage
The project website will show login page first. A new user can put desired username and password and press 'Create Account' button to create an account. Any error messages, such as username already existing, will show on top. When successful, user can press the 'Login' button to log-in. Upon login, the client will retrieve user and message data from server and display in sticky-notes format for the user to see. The user can hover on each messages to untilt, unshadow and zoom on them. To post a message, the user can click on the 'Post a Sticky Message' button to show a modal. In the modal, the user can select the receiver in the dropdown menu and write title and body of the message, and then click 'Submit Message' button to send the message. Clicking outside the modal or the 'Cancel' button will unmount the modal. Submitting a message will automatically refresh to show the new message as well. After 30 minutes upon login, the login will expire and user will automatically be returned to the login page.

## Project Contribution
This project was written by Ki Kim.

## Contacts
Questions regarding the project can be sent to Ki Kim's email: kikim1025@gmail.com