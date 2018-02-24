import React, { Component } from 'react';
import '../css/style.css';

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
    window.open(this.props.url + '/files/crx/'+ this.state.id);
  }

  loadXpiFromServer() {
    window.open(this.props.url + '/files/xpi/'+ this.state.id);
  }

  render() {
    //this check is for extensions that are floating out there which we haven't signed off on yet (by flipping the "live" switch)...
    //so we hide them
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
                <img width="128px" src={require("../../database/"+this.state.id+"/icon.png")} alt="uhh"></img>
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

export default Extension;
