import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Extension extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.extensionData.name,
      author: this.props.extensionData.author,
      description: this.props.extensionData.description,
      version: this.props.extensionData.version,
      id: this.props.extensionData._id,
      live: this.props.extensionData.live
    };
    this.loadCrxFromServer = this.loadCrxFromServer.bind(this);
    this.loadXpiFromServer = this.loadXpiFromServer.bind(this);

  }

  loadCrxFromServer() {
    window.open('http://localhost:3100/db/crx/'+ this.state.id);
  }

  loadXpiFromServer() {
    window.open('http://localhost:3100/db/xpi/'+ this.state.id);
  }

  render() {
    //these extensions are floating out there and we haven't signed off on them yet... hide 'em!
    if (this.state.live !== true) return null;
    return (
      <div className="col-md-6">
        <div className="extension">
          <div className="row">
            <div className="col-sm-6">
              <div className="title">
                <h1>{this.state.name}</h1>
              </div>
              <div className="icon">
                <img width="128px" src={require("../database/"+this.state.id+"/icon.png")} alt="uhh"></img>
              </div>
              <p>{"v"+this.state.version}</p>
              <p>{this.state.author}</p>
            </div>
            <div className="col-sm-6">
              <div className="description">
                <p>{this.state.description}</p>
              </div>
            </div>
          <button onClick={this.loadCrxFromServer} className="btn btn-success btn-lg btn-chrome">Get it for chrome</button>
          <button onClick={this.loadXpiFromServer} className="btn btn-success btn-lg btn-firefox">Get it for firefox</button>
          </div>
        </div>
      </div>
    );
  }
}

class ExtensionList extends Component {
  renderExtension(i){
    return (
      <Extension key={this.props.data[i]._id}
        extensionData={this.props.data[i]}
      />
    );
  }

  render() {
    let extensionRenderArray = [];
    for (let i=0; i<this.props.data.length; i++) {
      extensionRenderArray.push(this.renderExtension(i));
    }

    return (
      <div className="container">
        <div className="row">
          {extensionRenderArray}
        </div>
      </div>
    );
  }
}

class ExtensionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showModal:false
    };
    this.loadExtensionsFromServer = this.loadExtensionsFromServer.bind(this);
    this.handleExtensionSubmit = this.handleExtensionSubmit.bind(this);
  }

  handleExtensionSubmit(Extension) {
    //add POST request (note - no need for this at the moment - will need when implementing "submit extension" modal)
  }

  loadExtensionsFromServer() {
    axios.get(this.props.url)
    .then(res => {
    this.setState({ data: res.data });
    })
  }

  componentDidMount() {
    this.loadExtensionsFromServer();
    setInterval(this.loadExtensionsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div>
        <div className="extension-page">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <a className="navbar-brand">The Extension Place</a>
            </div>
            <ul className="nav navbar-right">
              <li><button className="btn btn-dflt">Site Feedback</button></li>
              <li><button className="btn btn-dflt">Submit Extension</button></li>
            </ul>
          </nav>

          <ExtensionList data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default ExtensionPage;
