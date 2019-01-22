import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Firebase} from '../Auth/Firebase';
import * as TimeStamp from '../Helpers/timestamp'
const firebase = require('firebase');

class ReportComments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actions:[],
    }
   this.actions =[]
   this.stateId = this.props.match.params.id
   this.reportRef =firebase.database().ref().child('reports')

  }
   componentWillMount(){
     this.reportRef.orderByChild('state').equalTo(this.props.match.params.id).once('value', (actions)=>{
       actions.forEach((action)=>{
         this.actions.push({
           action_type:action.val().action_type,
           report_time:action.val().report_time,
           attachment:action.val().attachment,
           actors:action.val().actors,
           comments:action.val().comments,
           key:action.key})
       })
       this.setState({actions:this.actions})

     })
   }
  render() {
    return (
      <div className="container" >
          <div className="row justify-content-md-center" style={{marginTop:90, boxShadow: '0  0 10px 0 #000'}}>
            {this.state.actions.map((action,key)=>
              <div className="col-12">
                <div className='row' style={{ backgroundColor:'#9E9E9E', paddingBottom:10, paddingTop:10}}>
                  <div className='col-10' >
                    <Link to ={"/comment/"+action.key} style={{ fontSize:18, color:'black', fontWeight:600}} >{action.action_type} by {action.actors}</Link>
                  </div>
                  <div className='col-sm '>
                    <b>{TimeStamp.timeSince(action.report_time)}</b>
                  </div>
                </div>
              <p   style={{marginTop:15}}>{action.comments}</p>
              <img style={{border: '1px solid #ddd',borderRadius:4, padding:5, width: 500,height:390,  marginBottom:20}} src={action.attachment}/>
            </div>
            )}
          </div>




            <nav aria-label="Page navigation example" style={{marginTop:20}}>
                <ul className="pagination justify-content-center">
                  <li className="page-item ">
                    <Link className="page-link" to="#" tabindex="-1">Previous</Link>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <Link className="page-link" to="#">Next</Link>
                  </li>
                </ul>
              </nav>
      </div>




    );
  }
}

export default ReportComments;
