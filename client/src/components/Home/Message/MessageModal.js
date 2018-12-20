import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import $ from 'axios';
import './MessageModal.css'

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            dropdown: false,
            dropdownVal: 'Choose Receiver',
            dropdownValId: '',
            title: '',
            body: '',
            alert: '',
            alertModal: ''
        }
        // can update this here to be modular when have time later, since they are just repeats
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.changeDropdownVal = this.changeDropdownVal.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    toggleModal() {
        this.setState({ dropdownVal: 'Choose Receiver', dropdownValId: '', title: '', body: '', alert: '', alertModal: '', modal: !this.state.modal });
    }

    toggleDropdown() {
        this.setState({ dropdown: !this.state.dropdown });
    }

    changeDropdownVal(event) {
        this.setState({ dropdownVal: event.target.name, dropdownValId: event.target.id });
    }

    // no binding is required for this
    getInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Post create message request, using the JWT prop passed all the way to here from App
    sendMessage() {
        if (this.state.title.length > 0 && this.state.body.length > 0 && this.state.dropdownValId.length > 0) {
            var config = {
                headers: {'x-access-token': this.props.jwt}
            };
            $.post('/api/message', {
                title: this.state.title,
                body: this.state.body,
                receiver: this.state.dropdownValId
            }, config)
            .then((res) => {
                this.toggleModal();
                if (res.data.status === 200) {
                    this.props.getData();
                } else if (res.data.status === 401) {
                    this.props.logout();
                } else {
                    this.setState({ alert: 'Something with request or server database went wrong.' });
                }
            });
        } else {
            this.setState({ alertModal: 'Title and body of message cannot be empty, and the receiver must be chosen in the dropdown menu.' });
        }
    }

    render() {
        return (
            <div id='button-container--post-message'> 
                <Button id='button--modal' onClick={this.toggleModal}>Post a Sticky Message</Button>
                <div>{this.state.alert}</div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>A New Sticky Message</ModalHeader>
                    <div id='alert--modal'>{this.state.alertModal}</div>
                    <ModalBody>
                        <form>
                            <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown}>
                                <DropdownToggle color='info' caret>
                                    {this.state.dropdownVal}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.userList.map((u, i) => (
                                        <React.Fragment key={i}>
                                            <DropdownItem name={u.username} id={u._id} onClick={this.changeDropdownVal}>{u.username}</DropdownItem>
                                            <DropdownItem divider />
                                        </React.Fragment>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <div id='input-modal'>
                                <textarea className='input-modal--input' name='title' onChange={this.getInput} cols='48' rows='1' maxLength='15' placeholder='Write a title here'></textarea>
                                <hr />
                                <textarea className='input-modal--input' name='body' onChange={this.getInput} cols='48' rows='10' maxLength='300' placeholder='Write a message here'></textarea>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.sendMessage}>Submit Message</Button>
                        <Button color='danger' onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MessageModal;