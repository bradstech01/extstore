import React, { Component } from 'react';
import '../css/style.css';

import Extension from './Extension.js';

class ExtensionList extends Component {
  renderExtension(i){
    return (
      <Extension url={this.props.url}
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

export default ExtensionList;
