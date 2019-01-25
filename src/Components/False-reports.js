import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Firebase} from '../Auth/Firebase';
import * as TimeStamp from '../Helpers/timestamp'
const firebase = require('firebase');

export default class FalseReports extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actions:[],
      start:50,
      showMore:false,
      loading:true
    }
   this.actions =[]
   this.reportRef =firebase.database().ref().child('reports')
   this.statesRef = firebase.database().ref().child('states')
  }
   componentWillMount(){
     //Use initial starting point of 50 items, update start value to see changes
    this.getData(this.state.start)
   }
   getData (start) {
     this.reportRef.orderByChild('false_report').equalTo(true).limitToFirst(start).once('value', (actions)=>{
       if (!actions.exists()) this.setState({loading:false})
       //Reset actions array for every retrieval
       this.actions = []
       //Set counter to track if to show 'View More' Button
       let counter = 0
       actions.forEach((action)=>{
         counter += 1
         this.statesRef.child(action.val().state).child('name').once('value', (state)=>{
           this.actions.push({
             action_type:action.val().action_type,
             report_time:action.val().report_time,
             attachment:action.val().attachment,
             actors:action.val().actors,
             comments:action.val().comments,
             key:action.key,
            state_name: state.val()
          })
           this.setState({actions:this.actions, loading:false})
         })
        })
       //If counter is less than start
       if (counter < start) {
         this.setState({showMore:false})
       }else{
         this.setState({showMore:true})
       }
     })
   }
   showMore = () => {
     let {start} = this.state
     start += 1
     this.getData(start)
     this.setState({start})
   }
  render() {
    return (
      <div className="container" >
          <div className="row justify-content-md-center" style={{marginTop:90, boxShadow: '0  0 10px 0 #000'}}>
            {this.state.loading && <h3 className='text-info text-center'>Loading...</h3>}
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
              {action.attachment !== '' &&   <img style={{border: '1px solid #ddd',borderRadius:4, padding:5, width: 500,height:390,  marginBottom:20}} src={action.attachment}/>}
              <p style={{fontWeight:'700'}}>Reported in: {action.state_name}</p>
            </div>
            )}
          </div>
          {this.state.showMore && <div><h3 className='text-info text-center' onClick={this.showMore}>View More</h3></div>}
      </div>
    );
  }
}
