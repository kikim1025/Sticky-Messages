import React from 'react';

const Message = (props) => (
    <div> 
        <div>Title: {props.title}</div>
        <div>Sender: {props.sender.username}</div>
        <div>Receiver: {props.receiver.username}</div>
        <div>Message: {props.body}</div>
    </div>
)

export default Message;