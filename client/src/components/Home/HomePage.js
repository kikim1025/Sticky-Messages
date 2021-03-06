import React from 'react';
import $ from 'axios';
import MessageModal from './Message/MessageModal';
import Message from './Message/Message';
import './HomePage.css';

class HomePage extends React.Component {
  state = {
    messageList: [],
    userList: [],
    alert: ''
  }

  // Retrieve user and message data
  getData = () => {
    $.get('/api/user')
    .then((res) => {
      if (res.data.status === 200) {
        this.setState({ userList: res.data.data });
      } else {
        this.setState({ alert: 'Something with request or server database went wrong.' });
      } 
    });
    $.get(`/api/message`)
    .then((res) => {
      if (res.data.status === 200) {
        this.setState({ messageList: res.data.data });
      } else {
        this.setState({ alert: 'Something with request or server database went wrong.' });
      }
    });
  }

  componentDidMount = () => {
    this.getData(); 
  }

  render() {
    return (
      <div id='home-page__container'>
        <MessageModal jwt={this.props.jwt} userList={this.state.userList} getData={this.getData} logout={this.props.logout} />
        { this.state.messageList.length === 0
          ? <div id='alert-temp'>Retrieving messages...</div> // Message database will never be empty in practice because I will post one right after deployment. So this will only show while axios is retrieving
          : this.state.messageList.map((m, i) => (
              <Message
                title={m.title}
                body={m.body}
                sender={m.sender}
                receiver={m.receiver} 
                key = {i}
              />
            ))
        }
      </div>
    );
  }
}

export default HomePage;