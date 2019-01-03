import React, { Component } from 'react';
import Modal from 'react-modal';
import './bootstrap.css';
import io from "socket.io-client";

const ip = "127.0.0.1";
const port = "8080"

// const ip = "13.58.124.57";
// const port = "80"
const address = "http://" + ip + ":" + port
const lobbyAddr = "http://" + ip + "/lobby" + ":" + port

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Modal.setAppElement('App')

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      clientIp: '',
      username: '',
      input: '',
      roomTitle : '',
      modalIsOpen : false
    };

    this.inputChange = this.inputChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    
    //Relate to create room
    this.roomTitleChange = this.roomTitleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    
    //Relate to Modal
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.socket = io(address);

    this.socket.on('RECEIVE_IP', function(data){
      setIp(data)
    })

    const setIp = data => {
      this.setState({clientIp : data})
    }

    // Get user info
    this.socket.on('RECEIVE_USERINFO', function(data){
      setUsername(data.nickname);
      setWin(data.win);
      setLose(data.lose);
    });

    const setUsername = data => {
      this.setState({username : data});
    }

    const setWin = data => {
      this.setState({win : data})
    }

    const setLose = data => {
      this.setState({lose : data})
    }
  }

  inputChange(event){
    this.setState({input: event.target.value})
  }

  usernameChange(){
    this.setState({username: this.state.input});

    this.socket.emit('CHANGE_USERNAME',{
      username: this.state.input
    })
  }
  roomTitleChange(event){
    this.setState({roomTitle: event.target.value})
  }

  createRoom(){
    this.setState({modalIsOpen: false})
  }
  
  openModal(){
    this.setState({modalIsOpen: true});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <h1 style={{display: 'flex', justifyContent: 'center'}}> PPU TE </h1>
        
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          {/* <button type="button" class="btn btn-primary btn-sm"
                  onClick={this.createRoom}>Create Room</button> */}
          <button type="button" class="btn btn-primary btn-sm"
            onClick = {this.openModal}>Create Room</button>
          <Modal
            isOpen = {this.state.modalIsOpen}
            onRequestClose = {this.closeModal}
            style = {customStyles}
            contentLabel = "Example Modal" >
              <input type="text" name="nickname" 
                   onChange={this.inputChange}></input>
              <button type="button" class="btn btn-primary btn-sm" 
                onClick={this.createRoom}>Create</button>
              <button type="button" class="btn btn-primary btn-sm" 
                onClick={this.closeModal}>close</button>
          </Modal>
          &ensp;
          <form>
            <input type="text" name="nickname" 
                   onChange={this.inputChange}></input>
            &ensp;
            <button type="submit" class="btn btn-primary"
                  onClick={this.usernameChange}>Submit</button>
            {/* <input type="submit" class="btn btn-primary btn-sm" value="change"
                   onClick={this.usernameChange.bind(this)}></input> */}
          </form>
        </div>

        <div>{this.state.username}</div>
              
        <br></br>

        <table style={{border: '1px solid white', width: '100%'}}>
        
          <div>
            Sample Room&ensp;
            <button type="button" class="btn btn-primary btn-sm">Enter</button>
          </div>

          <div>
            Sample Room2&ensp;
            <button type="button" class="btn btn-primary btn-sm">Enter</button>
          </div>

        </table>
      
      </div>
    );
  }
}

// class Lobby extends Component{
//   constructor(props){
//     super(props)
//   }

//   this.state = {

//   }
// }

export default App;