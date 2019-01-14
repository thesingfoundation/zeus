import React, {Component} from 'react';
import {PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const data = [
  {name: 'Group H', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, {name: 'Group D', value: 500}
];
const data2 = [
  {name: 'Group H', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}
];
const data3= [
      {name: 'Brass', pv: 2400, amt: 2400},
      {name: 'Ekeremor', pv: 1398, amt: 2210},
      {name: 'Kolokuma/Opukuma', pv: 9800, amt: 2290},
      {name: 'Nembe', pv: 3908, amt: 2000},
      {name: 'Ogbia', pv: 4800, amt: 2181},
      {name: 'Sagbama', pv: 3800, amt: 2500},
      {name: 'Southern Ijaw', pv: 4300, amt: 2100},
      {name: 'Yenagoa', pv: 3150, amt: 1980},
];
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Community Thug ${value}`}</text>
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
      activeIndex: 0,
      presentIndex:0,
    }
    this.stateId = this.props.match.params.id
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
    return (
      <div className='col-sm-12' style={{marginTop:60,}}>
        <p style={{textAlign:'center', fontSize:22, fontWeight:'800', marginTop:30}}>Incidents by Local Government</p>
        <div className="row justify-content-center">
          <div className='col-10' >
            <div className='col-12' >
              <LineChart width={1300} height={500}  data={data3}
                    margin={{top: 20, right: 30, left: 20, bottom: 10}}>
               <CartesianGrid strokeDasharray="3 3"/>
               <XAxis dataKey="name" height={100} tick={<CustomizedAxisTick/>}/>
               <YAxis/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />}/>

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
            data={data}
            cx={450}
            cy={250}
            innerRadius={100}
            outerRadius={180}
            fill="#8884d8"
            onMouseEnter={this.onPieEnter}
          >
            {
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
         </PieChart>
            </div>
            <div className="col-6" >

              <PieChart width={1000} height={800} >
          <Pie
          	activeIndex={this.state.presentIndex}
            activeShape={renderActiveShape}
            data={data2}
            cx={400}
            cy={250}
            innerRadius={100}
            outerRadius={180}
            fill="blue"
            onMouseEnter={this.onPieEnt}
          >
            {
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
         </PieChart>
            </div>


          </div>
      </div>

    )
  }
}
