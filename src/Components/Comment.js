import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Firebase} from '../Auth/Firebase';
import * as TimeStamp from '../Helpers/timestamp'
const firebase = require('firebase');

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading:true
    }
   this.actions =[]
   this.id = this.props.match.params.id
   this.reportRef =firebase.database().ref().child('reports')

  }
   componentWillMount(){
     this.reportRef.child(this.props.match.params.id).once('value', (actions)=>{
       this.setState({
         key:actions.key,
         action_type:actions.val().action_type,
         report_time:actions.val().report_time,
         actors:actions.val().actors,
         comments:actions.val().comments,
         attachment:actions.val().attachment,
         false_report: actions.hasChild('false_report') ? actions.val().false_report : false,
         loading:false
       })

     })
   }
   toggleFalse = () => {
     this.reportRef.child(this.props.match.params.id).update({false_report: !this.state.false_report})
     this.setState(prev => ({false_report:!prev.false_report}))
   }
  render() {
    return (
      <div className="container" >
          <div className="row justify-content-md-center" style={{marginTop:90, boxShadow: '0  0 10px 0 #000'}}>
            {this.state.loading ? <h3 className='text-center text-info'>Loading...</h3> :
             <div className="col-12">
                <div className='row' style={{ paddingBottom:10, paddingTop:10}}>
                  <div className='col-10' >
                    <h3 className='text-center' style={{ fontSize:18}} >{this.state.action_type} by {this.state.actors}</h3>
                  </div>
                </div>
              <div className='text-center'>
                {this.state.attachment !== "" && <img src={this.state.attachment} style={{border: '1px solid #ddd',borderRadius:4, padding:5, width: 500,height:390,  marginBottom:20,}} className='img-responsive'/>}
                  <p style={{marginTop:15}}>{this.state.comments}</p>
              </div>
              <div className='row'>
                <div className='col-8'>
                  {this.state.false_report ? <button onClick={this.toggleFalse} className='btn btn-success'>Marked As False (Undo)</button>
                  : <button onClick={this.toggleFalse} className='btn btn-danger'>Mark As False</button>}

                </div>
                <div className='col-4 float-right'>
                  <p>{TimeStamp.timeSince(this.state.report_time)}</p>
                </div>
              </div>
            </div>}
          </div>

      </div>




    );
  }
}

export default Comment;
