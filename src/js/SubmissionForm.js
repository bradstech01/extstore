import React, { Component } from 'react';
import '../css/style.css';

class SubmissionForm extends Component {
  render() {
    return (
      <div className="submission-form">
        <form>
          <h2>Submit an Extension</h2>
          <p>Fill out this form - we will review your submission and be in contact.</p>

          <div className="form-group row">
            <label for="extension-name" className="col-3 col-form-label">Extension Name</label>
            <div class="col-9">
              <input type="text" className="form-control" id="extname"></input>
            </div>

            <label for="extension-author" className="col-3 col-form-label">Author</label>
            <div class="col-9">
              <input type="text" className="form-control" id="author"></input>
            </div>

            <label for="extension-name" className="col-3 col-form-label">Email</label>
            <div class="col-9">
              <input type="email" className="form-control" id="email"></input>
            </div>

            <label for="extension-desc" className="col-3 col-form-label">Description</label>
            <div class="col-9">
              <textarea className="form-control" id="description"></textarea>
            </div>

            <label for="extension-file" className="col-3 col-form-label">Chrome extension</label>
            <div class="col-9">
              <input type="file" className="form-control-file" id="crxInputFile"></input>
              <small id="crxHelp" className="form-text text-muted">Put the .crx file here if you have it (for Chrome extensions).</small>
            </div>

            <label for="extension-file" className="col-3 col-form-label">Firefox extension</label>
            <div class="col-9">
              <input type="file" className="form-control-file" id="xpiInputFile"></input>
              <small id="xpiHelp" className="form-text text-muted">Put the .xpi file here if you have it (for Firefox extensions).</small>
            </div>
          </div>
        </form>

<div className="btn-group">
        <p><button className="btn btn-primary" onClick={() => this.props.submit()}>Submit</button></p>
        <p><button className="btn close-modal-btn" onClick={() => this.props.close()}>Close</button></p>
</div>
      </div>
    )
  }
}

export default SubmissionForm;
