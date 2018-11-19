import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render () {
    return (
      <div className='row'>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{backgroundColor:'#005005'}} >
          <a className="navbar-brand" href="#">Project Zeus</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/states" >Polling Units</Link>
              </li>

            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
