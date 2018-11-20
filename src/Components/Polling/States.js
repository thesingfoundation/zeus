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
export default class States extends Component {
  constructor (props) {
    super(props)
    this.state = {
      elements:[],
      loading:true,
      open:false,
    }
    this.elements = []
    this.ref = firebase.database().ref().child('states')
  }
  componentWillMount () {
    this.ref.once('value', (states)=> {
      if (!states.exists()) {
        this.setState({loading:false, noStates:true})
      }
      states.forEach((state)=> {
        this.elements.unshift({name:state.val().name, key:state.key, lgas:state.val().lgas, wards:state.val().wards, units:state.val().units})
        this.setState({elements:this.elements, loading:false})
      })
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
      name:this.state.state,
      lgas:0,
      wards:0,
      units:0
    }
    let key = this.ref.push(data).key
    data['key'] = key
    this.elements.unshift(data)
    this.setState({elements:this.elements, state:'', noStates:false})
    this.handleClose();
  }
  handleTextChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  showElement (element, key) {
    return (
      <div key={element.key} className='col-sm-4' style={{marginTop:'20px'}} >
        <Paper key={key} elevation={2}>
          <div className='text-center'>
            <Link to={"/states/"+element.key}>
              <Typography variant="headline" component="h3" style={{padding:'10px'}}>
                {element.name}
              </Typography>
            </Link>
          </div>
          <div className='row' style={{padding:'20px'}}>
            <div className='col-sm-4'>
              <Typography component="p">
                LGAs: {element.lgas}
              </Typography>
            </div>
            <div className='col-sm-4'>
              <Typography component="p">
                Wards: {element.wards}
              </Typography>
            </div>
            <div className='col-sm-4'>
              <Typography component="p">
                Units: {element.units}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
  render () {
    return (
      <div style={{marginTop:60}} className='container'>
        <h2 className='text-info text-center'>Niger Delta States</h2>
        <div>
          {(()=>{
            if (this.state.loading) {
              return (
                <div style={{marginTop:'15%'}} className='text-center'>
                    <CircularProgress size={50}  />
                </div>
              )
            }else if (this.state.noStates) {
              return (
                <div style={{marginTop:'15%'}} className='text-center'>
                  <h3 className='text-center text-danger' style={{marginTop:'10%'}}>No state found. Click '+' below to create a state</h3>
                </div>
              )
            }else{
              return(
                <div className='row'>
                   {this.state.elements.map((el, key)=>
                     this.showElement(el, key)
                   )}
              </div>
              )
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
            {"Create State"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new Niger Delta state to initiate instances of lgas, wards, and polling units.
            </DialogContentText>
            <TextField
              id="with-placeholder"
              label="Create State"
              placeholder="Enter state"
              margin="normal"
              fullWidth={true}
              name='state'
              value={this.state.state}
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
