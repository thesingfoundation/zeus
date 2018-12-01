import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Firebase from '../../Auth/Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
const firebase = require('firebase');
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default class Lga extends Component {
  constructor (props) {
    super(props)
    this.state = {
      elements:[],
      loading:true,
      open:false,
    }
    this.elements = []
    this.ref = firebase.database().ref().child('polling_units').child(this.props.match.params.wardId)
    this.wardsRef = firebase.database().ref().child('wards').child(this.props.match.params.lgaId)
    this.statesRef = firebase.database().ref().child('states')
    this.lgaRef = firebase.database().ref().child('lgas').child(this.props.match.params.stateId)
  }
  componentWillMount () {
    this.ref.once('value', (units)=> {
      if (!units.exists()) {
        this.setState({loading:false, nounits:true})
      }
      units.forEach((state)=> {
        this.elements.unshift({name:state.val().name, key:state.key,  reports:state.val().reports, unitId: state.val().unitId})
        this.setState({elements:this.elements, loading:false})
      })
    })
    this.wardsRef.child(this.props.match.params.wardId).child('name').once('value', (name)=> {
      this.setState({ward:name.val()})
    })
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    var data = {
      name:this.state.unit,
      unitId:this.state.unitId,
      reports:0
    }
    if (this.state.editing) {
      this.ref.child(this.state.itemKey).update({
        name:this.state.unit,
        unitId:this.state.unitId
      })
      data['key'] = this.state.itemKey
      this.elements[this.state.itemIndex] = data
    }else{
      let key = this.ref.push(data).key
      data['key'] = key
      this.elements.unshift(data)
      this.statesRef.child(this.props.match.params.stateId).child('units').once('value', (units)=> {
        units.ref.set(units.val() + 1)
      })
      this.lgaRef.child(this.props.match.params.lgaId).child('units').once('value', (units)=> {
        units.ref.set(units.val() + 1)
      })
      this.wardsRef.child(this.props.match.params.wardId).child('units').once('value', (units)=> {
        units.ref.set(units.val() + 1)
      })
    }
    this.setState({elements:this.elements, lga:'', nounits:false})
    this.handleClose();
  }
  handleTextChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  editUnit (element, key) {
    this.setState({
      editing:true,
      unit:element.name,
      unitId:element.unitId,
      open:true,
      itemKey:element.key,
      itemIndex:key
    })
  }
  deleteUnit(element) {
    //eslint-disable-next-line
    if (confirm("Are you sure you want to delete?")) {
      this.ref.child(element.key).remove()
      this.statesRef.child(this.props.match.params.stateId).child('units').once('value', (units)=> {
        units.ref.set(units.val() - 1)
      })
      this.lgaRef.child(this.props.match.params.lgaId).child('units').once('value', (units)=> {
        units.ref.set(units.val() - 1)
      })
      this.wardsRef.child(this.props.match.params.wardId).child('units').once('value', (units)=> {
        units.ref.set(units.val() - 1)
      })
      this.elements = this.state.elements.filter((el)=> el.key !== element.key)
      if (this.elements.length > 0) {
        this.setState({elements:this.elements})
      }else{
        this.setState({elements:this.elements, nounits:true})
      }

    }
  }
  showElement () {
    return (
      <div  className='col-sm-10 mx-auto' >
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Unit Id</th>
              <th>Reports</th>
              <th>View</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elements.map((element, key)=>
              <tr key={key}>
                <td>{key+1}</td>
                <td>{element.name}</td>
                <td>{element.unitId}</td>
                <td>{element.reports}</td>
                <td><button className='btn btn-primary'>View</button></td>
                <td>
                  <span style={{cursor:'pointer', fontSize:'14px'}} onClick={()=>this.editUnit(element, key)}>Edit</span>&nbsp;&nbsp;
                  <span style={{cursor:'pointer', fontSize:'14px'}} onClick={()=>this.deleteUnit(element)}>Delete</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
  render () {
    return (
      <div style={{marginTop:60}} className='container'>
        {!this.state.loading && <h2 className='text-info text-center'>{this.state.ward} Units</h2>}
        <div>
          {(()=>{
            if (this.state.loading) {
              return (
                <div style={{marginTop:'15%'}} className='text-center'>
                    <CircularProgress size={50}  />
                </div>
              )
            }else if (this.state.nounits) {
              return (
                <div style={{marginTop:'15%'}} className='text-center'>
                  <h3 className='text-center text-danger' style={{marginTop:'10%'}}>No polling units found. Click '+' below to create a polling unit.</h3>
                </div>
              )
            }else{
              return (
                <div className='row'>
                  {this.showElement()}
                </div>)
            }
          })()}
        </div>
        <div className='float-right' style={{position:'fixed', bottom:'10px', zIndex:'100', right:'15px' }}>
          <Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="Add">
            <AddIcon />
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Create Polling Unit"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a Polling unit to a ward in a Local Government Areas of a Niger Delta State.
            </DialogContentText>
            <TextField
              id="with-placeholder"
              //label="Polling Unit Name"
              placeholder="Enter polling unit"
              margin="normal"
              fullWidth={true}
              name='unit'
              value={this.state.unit}
              onChange={this.handleTextChange}
            />
            <TextField
              id="with-placeholder"
              //label="Polling Unit Id"
              placeholder="Enter polling unit id"
              margin="normal"
              fullWidth={true}
              name='unitId'
              value={this.state.unitId}
              onChange={this.handleTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
