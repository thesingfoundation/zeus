import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Firebase} from '../Auth/Firebase';

const firebase = require('firebase');

class Reports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      elements:[]
    }

    this.elements = []
    this.ref = firebase.database().ref().child('states')

  }

      componentWillMount(){
        this.ref.once('value', (elements)=>{
          elements.forEach((element)=>{
            this.elements.push({
              name:element.val().name,
              key:element.key})
          })
          this.setState({elements:this.elements})
     
        })
      }
  render() {

    return (
      <div className="container" >
          <div className="col-sm-12" style={{marginTop:90, boxShadow: '0  0 10px 0 #000'}}>
            <ul style={{fontSize:20}}>
               {this.state.elements.map((element, key)=>
                   <li key={key} style={{borderBottom:'1px solid grey', padding:10}}> <Link to={"/reportdetails/"+element.key}>{element.name}</Link></li>
               )}

            </ul>
          </div>
      </div>




    );
  }
}

export default Reports;
