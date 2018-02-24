import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios';

import ExtensionList from './ExtensionList';
import Modal from './Modal';
import SubmissionForm from './SubmissionForm';

class ExtensionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isModalOpen:false
    };
    this.loadExtensionsFromServer = this.loadExtensionsFromServer.bind(this);
    this.handleExtensionSubmit = this.handleExtensionSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleExtensionSubmit(Extension) {
    //add POST request (note - no need for this at the moment - will need when fully implementing "submit extension" modal)
  }

  loadExtensionsFromServer() {
    axios.get(this.props.url +'/extensions')
    .then(res => {
      this.setState({
        data: res.data
      });
    })
  }

  componentDidMount() {
    this.loadExtensionsFromServer();
    setInterval(this.loadExtensionsFromServer, this.props.pollInterval);
  }

  //Modal controller functions
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div>
        <div className="extension-page">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <a className="navbar-brand"><h1>The Extension Place</h1></a>
            </div>
            <ul className="nav navbar-right">
              <li><button className="btn btn-dflt">Feedback</button></li>
              <li><button className="btn btn-dflt" onClick={() => this.openModal()}>Submit Extension</button></li>
            </ul>
          </nav>
          <ExtensionList data={this.state.data} url={this.props.url}/>
        </div>
        <Modal width='600' height='600' isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <SubmissionForm close={this.closeModal} submit={this.handleExtensionSubmit}/>
        </Modal>
      </div>
    );
  }
}

export default ExtensionPage;
