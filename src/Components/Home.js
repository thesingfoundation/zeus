import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  from 'recharts';
import {Firebase} from '../Auth/Firebase';
const firebase = require('firebase');
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items:[],
      loading:true
    }
    this.ref = firebase.database().ref().child('stats')
    this.items = []
  }
  componentDidMount() {
    this.ref.once('value', (elements)=> {
      elements.forEach((element)=> {
        let temp_array = []
         temp_array.push({
           name:element.val().name,
           election:element.val().election,
           preelection:element.val().preelection,
           postelection:element.val().postelection,
           key:element.key
         })
        this.items.push(temp_array)
      })
      this.setState({items:this.items,loading:false})
    })
  }

  render () {
    return (
      <div style={{marginTop:60}} className='col-sm-12'>
        <div className='row' >
          <div className='col-sm-9' >
            <div className='container' style={{marginTop:30}} >
              {this.state.loading ? <h3 className='text-center text-info'>Loading...</h3>  :
              <div className='row' >
              {this.state.items.map((item, key)=> {
                return (
                  <Link key={key} className='col-sm-4' to={"/statereport/"+item[0].key}>
                    <BarChart width={400} height={300} data={item}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <XAxis dataKey="name"/>
                       <YAxis/>
                       <Tooltip/>
                       <Legend />
                       <Bar dataKey="election" fill="#8884d8" />
                       <Bar dataKey="preelection" fill="#82ca9d" />
                       <Bar dataKey="postelection" fill="yellow" />
                      </BarChart>
                  </Link>
                )
              }

              )}
            </div>
          }
            </div>
          </div>
          <div className='col-sm-3' >
            <div className="card-header" style={{boxShadow: '  0 0 10px #000',}}>
                <p style={{textAlign:'center', fontSize:26, fontWeight:'800', marginTop:10, }}>Notifications</p>
              </div>

              <div style={{border:'1px solid grey', borderRadius: '10'}}>
                <div  style={{ marginTop:5, borderBottom:'1px solid grey'}}>
                  <div style={{paddingLeft:10, paddingRight:10}}>
                    <span >There has been election violence in the areas of bassanbiri town in nembe local government</span>
                  </div>
                  <div className='row' style={{marginTop:5}}>
                    <div className='text-center col-12'>
                      <button type="button" className="btn btn-success">Accept</button> &nbsp; &nbsp;
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3'>
                      <p >3:45pm</p>
                    </div>
                  </div>
                </div>
                <div  style={{ marginTop:5, borderBottom:'1px solid grey'}}>
                  <div style={{paddingLeft:10, paddingRight:10}}>
                    <span> There has been election violence in the areas of bassanbiri town in nembe local government</span>
                  </div>
                  <div className='row' style={{marginTop:5}}>
                    <div className='text-center col-12'>
                      <button type="button" className="btn btn-success">Accept</button> &nbsp; &nbsp;
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3'>
                      <p >3:45pm</p>
                    </div>
                  </div>
                </div>
                <div  style={{ marginTop:5}}>
                  <div style={{paddingLeft:10, paddingRight:10}}>
                    <span> There has been election violence in the areas of bassanbiri town in nembe local government</span>
                  </div>
                  <div className='row' style={{marginTop:5}}>
                    <div className='text-center col-12'>
                      <button type="button" className="btn btn-success">Accept</button> &nbsp; &nbsp;
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3'>
                      <p >3:45pm</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <Link  to='/reports' style={{color:'blue', margin:60}}>View more...</Link>
              </div>
          </div>


        </div>

      </div>
    )
  }
}
