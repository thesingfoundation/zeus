import React, {Component} from 'react';
import {PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Firebase} from '../Auth/Firebase';
const firebase = require('firebase');

// const data = [
//   {name: 'Group H', value: 400}, {name: 'Group B', value: 300},
//   {name: 'Group C', value: 300}, {name: 'Group D', value: 500}
// ];
// const data2 = [
//   {name: 'Group H', value: 400}, {name: 'Group B', value: 300},
//   {name: 'Group C', value: 300}
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}
      const CustomizedLabel = (props) => {
          const {x, y, stroke, value} = props;
         	return (<text x={x} y={y} dy={-4} fill={stroke} fontSize={16} textAnchor="middle">{value}</text>)
      }
      const CustomizedAxisTick = (props) => {
          const {x, y, stroke, payload} = props;
         	return (
          	<g transform={`translate(${x},${y})`}>
              <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
          );
      }
export default class StateReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions:[],
      actors:[],
      activeIndex: 0,
      presentIndex:0,
      reports:[],
    }
    this.stateId = this.props.match.params.id
    this.reportRef =firebase.database().ref().child('reports')
    this.lgaRef = firebase.database().ref().child('lgas')
    this.actions = []
    this.actors =[]
    this.reports =[]
      console.log(this.stateId);

  }

  componentDidMount(){
    this.actorReport()
    this.lgaReport()
  }

  lgaReport(){
    this.lgaRef.child(this.stateId).once('value', (reports)=>{
      reports.forEach((report)=>{
        this.reports.push({
          name:report.val().name,
          reports:report.val().reports !== undefined ? report.val().reports : 0,
          key:report.key})
      })
      this.setState({reports:this.reports})

    })
  }

  actorReport(){
    let politicalThug=0
    let lawEnforcementAgents =0
    let politicalPartiesAgents = 0
    let communityMembers = 0
    let politicalCandidates =0
    let ballotSnatching = 0
    let intimidationOfVoters = 0


    this.reportRef.orderByChild('state').equalTo(this.props.match.params.id).once('value', (actions)=>{
      actions.forEach((action)=>{

        if(action.val().action_type === 'Ballot Snatching'){
          ballotSnatching += 1
        }

        if(action.val().action_type === 'Intimidation of Voters'){
          intimidationOfVoters += 1
        }
        if(action.val().actors === 'Political Thugs'){
          politicalThug += 1

        }
        if(action.val().actors === 'Law Enforcement Agents'){
          lawEnforcementAgents += 1

        }
        if(action.val().actors === 'Political Parties Agents/ Supporters'){
          politicalPartiesAgents += 1

        }
        if(action.val().actors === 'Community Members'){
          communityMembers += 1

        }
        if(action.val().actors === 'Candidates'){
          politicalCandidates += 1

        }

        // this.actions.push({
        //  action_type:action.val().action_type,
        //  actors:action.val().actors,
        //  key:action.key})
      })


      let data1 =[{name:'Ballot Snatching', value:ballotSnatching }, {name:'Intimidation of Voters', value:intimidationOfVoters },
                  ]
      let data2 =[{name:'Law Enforcement Agents', value:lawEnforcementAgents}, {name:'Political Thugs', value:politicalThug },
                {name:'Political Parties Agents/ Supporters', value:politicalPartiesAgents },{name:'Community Members', value:  communityMembers},
              {name:'Political Candidates', value:politicalCandidates }]

      this.setState({actions:data1, actors:data2})

    })
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }
  onPieEnt = (data2, int) => {
    this.setState({
      presentIndex: int,
    });
  }
  render () {
    let {reports} = this.state


    return (
      <div className='col-sm-12' style={{marginTop:60,}}>
        <p style={{textAlign:'center', fontSize:22, fontWeight:'800', marginTop:30}}>Incidents by Local Government</p>
        <div className="row justify-content-center">
          <div className='col-10' >
            <div className='col-12' >

              <LineChart width={1300} height={500}  data={this.state.reports}
                  margin={{top: 20, right: 30, left: 20, bottom: 10}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="reports" stroke="#8884d8" activeDot={{r: 8}}/>

              </LineChart>





            </div>
          </div>
        </div>
          <p style={{textAlign:'center', fontSize:22, fontWeight:'800', marginTop:30}}>Incidents by Actors and Types</p>
        <div className="row justify-content-center" >
            <div className="col-6" >

                  <PieChart width={1000} height={800} >
                  <Pie
              	activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.actions}
                cx={450}
                cy={250}
                innerRadius={100}
                outerRadius={180}
                fill="#8884d8"
                onMouseEnter={this.onPieEnter}
              >
                {
              	this.state.actions.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
             </PieChart>



            </div>
            <div className="col-6" >

              <PieChart width={1000} height={800} >
          <Pie
          	activeIndex={this.state.presentIndex}
            activeShape={renderActiveShape}
            data={this.state.actors}
            cx={400}
            cy={250}
            innerRadius={100}
            outerRadius={180}
            fill="blue"
            onMouseEnter={this.onPieEnt}
          >
            {
          	this.state.actors.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
         </PieChart>
            </div>


          </div>
      </div>

    )
  }
}
