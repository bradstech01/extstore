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
  }

  render() {
    //these extensions are floating out there and we haven't signed off on them yet... hide 'em!
    if (this.state.live !== true) return null;

    return (
      <div className="col-md-6">
        <h1>{this.state.name}</h1>
        <img width="256px" src={require("../database/"+this.state.id+"/icon.png")} alt="uhh"></img>
        <p>{"v"+this.state.version}</p>
        <p>{this.state.author}</p>
        <p>{this.state.description}</p>
        <div className="btn-group">
          <a href={"/database/"+this.state.id+"/dist.crx"} className="btn btn-link btn-lg" role="button">Get it for chrome</a>
          <br/>
          <a href={"/database/"+this.state.id+"/dist.xpi"} className="btn btn-link btn-lg" role="button">Get it for firefox</a>
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
    //add POST request (note - no need for this at the moment)
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
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">The Extension Place</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>Site Feedback</li>
                <li><button className="btn btn-dflt">Submit Extension</button></li>
              </ul>
            </div>
          </nav>

          <ExtensionList data={this.state.data}/>
          <footer className="extension-page-footer">
          &copy; 2018
          </footer>
        </div>
      </div>
    );
  }
}

export default ExtensionPage;
