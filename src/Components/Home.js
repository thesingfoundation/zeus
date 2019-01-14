import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  from 'recharts';

export default class Home extends Component {
  render () {
    const abia = [
          {name: 'Abia', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const akwaibom = [
          {name: 'Akwa Ibom', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const bayelsa = [
          {name: 'Bayelsa', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const crossrivers = [
          {name: 'Cross Rivers', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const delta = [
          {name: 'Delta', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const edo = [
          {name: 'Edo', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const imo = [
          {name: 'Imo', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const ondo = [
          {name: 'ondo', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    const rivers = [
          {name: 'rivers', uv: 4000, pv: 2400, dv: 2400, amt: 2400}
    ];
    return (
      <div style={{marginTop:60}} className='col-sm-12'>
        <div className='row' >
          <div className='col-sm-9' >
            <div className='container' style={{marginTop:30}} >
            <div className='row' >
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={abia}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#8884d8" />
                   <Bar dataKey="uv" fill="#82ca9d" />
                   <Bar dataKey="dv" fill="yellow" />
                  </BarChart>
              </Link>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={akwaibom}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis  dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="red" />
                   <Bar dataKey="uv" fill="purple" />
                   <Bar dataKey="dv" fill="yellow" />
                  </BarChart>
              </Link>
            <Link className='col-sm-4' to="/statereport">
                  <BarChart width={400} height={300} data={bayelsa}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <Tooltip/>
                     <Legend />
                     <Bar dataKey="pv" fill="orange" />
                     <Bar dataKey="uv" fill="red" />
                     <Bar dataKey="dv" fill="green" />
                    </BarChart>
              </Link>
            </div>

            <div className='row'>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={crossrivers}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#80D8FF" />
                   <Bar dataKey="uv" fill="#4527A0" />
                   <Bar dataKey="dv" fill="#CCFF90" />
                  </BarChart>
              </Link>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={delta}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#FF3D00" />
                   <Bar dataKey="uv" fill="#B39DDB" />
                   <Bar dataKey="dv" fill="#5D4037" />
                  </BarChart>
              </Link>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={edo}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="yellow" />
                   <Bar dataKey="uv" fill="red" />
                   <Bar dataKey="dv" fill="purple" />
                  </BarChart>
              </Link>
            </div>

            <div className='row'>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={imo}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#00C853" />
                   <Bar dataKey="uv" fill="#212121" />
                   <Bar dataKey="dv" fill="#DCEDC8" />
                  </BarChart>
              </Link>
              <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={ondo}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#795548" />
                   <Bar dataKey="uv" fill="#757575" />
                   <Bar dataKey="dv" fill="#7B1FA2" />
                  </BarChart>
              </Link>
            <Link className='col-sm-4' to="/statereport">
                <BarChart width={400} height={300} data={rivers}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" fill="#009688" />
                   <Bar dataKey="uv" fill="#00BCD4" />
                   <Bar dataKey="dv" fill="#3F51B5" />
                  </BarChart>
              </Link>
            </div>

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
