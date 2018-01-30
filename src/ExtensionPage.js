import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Extension extends Component {
  constructor(props){
    super(props);
    this.state = {
      extensionName: this.props.extensionData.name,
      extensionAuthor: this.props.extensionData.author,
      extensionDescription: this.props.extensionData.description,
      extensionVersion: this.props.extensionData.version,
      extensionId: this.props.extensionData._id
    };
  }

  render() {
    return (
      <div className="extension">
        <h1>{this.state.extensionName}</h1>
        <img width="256px" src={"/database/"+this.state.extensionId+"/icon.png"} alt="uhh"></img>
        <p>{"v"+this.state.extensionVersion}</p>
        <p>{this.state.extensionAuthor}</p>
        <p>{this.state.extensionDescription}</p>
        <a href={"/database/"+this.state.extensionId+"/dist.crx"}>Get it for chrome</a>
        <br/>
        <a href={"/database/"+this.state.extensionId+"/dist.xpi"}>Get it for firefox</a>
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
      <div className="ExtensionList">
        {extensionRenderArray}
      </div>
    );
  }
}

class ExtensionPage extends Component {
  constructor(props){
    super(props);
    this.state = { data: [] };
    this.loadExtensionsFromServer = this.loadExtensionsFromServer.bind(this);
    this.handleExtensionSubmit = this.handleExtensionSubmit.bind(this);
  }

  loadExtensionsFromServer() {
    axios.get(this.props.url)
    .then(res => {
    this.setState({ data: res.data });
    })
  }

  handleExtensionSubmit(Extension) {
    //add POST request (note - no need for this at the moment)
  }

  componentDidMount() {
    this.loadExtensionsFromServer();
    setInterval(this.loadExtensionsFromServer, this.props.pollInterval);
  }

  render() {
    console.log(this.state.data);

    return (
      <div className="extension-page">
        <div className="content">
          <header className="extension-page-header">
            <h1>Extension Store</h1>
          </header>
          <ExtensionList data={this.state.data}/>
        </div>
        <footer className="extension-page-footer">
        &copy; 2018
        </footer>
      </div>
    );
  }
}

export default ExtensionPage;
