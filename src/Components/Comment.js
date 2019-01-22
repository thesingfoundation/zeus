import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Firebase} from '../Auth/Firebase';
import * as TimeStamp from '../Helpers/timestamp'
const firebase = require('firebase');

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actions:[],
    }
   this.actions =[]
   this.id = this.props.match.params.id
   this.reportRef =firebase.database().ref().child('reports')

  }
   componentWillMount(){
     this.reportRef.child(this.props.match.params.id).once('value', (actions)=>{
         this.actions.push({
           action_type:actions.val().action_type,
           report_time:actions.val().report_time,
           actors:actions.val().actors,
           comments:actions.val().comments,
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
                    <b style={{ fontSize:18}} >{action.action_type} by {action.actors}</b>
                  </div>
                  <div className='col-sm '>
                    <b>{TimeStamp.timeSince(action.report_time)}</b>
                  </div>
                </div>
              <p style={{marginTop:15}}>{action.comments}</p>
            </div>
            )}
          </div>

      </div>




    );
  }
}

export default Comment;
