import React from 'react';
import './Message.css'

const Message = (props) => (
    <div className='message'> 
        <div className='message__title'>Title: {props.title}</div>
        <div className='message__sender'>From: {props.sender.username}</div>
        <div className='message__receiver'>To: {props.receiver.username}</div>
        <div className='message__body'>{props.body}</div>
    </div>
)

export default Message;