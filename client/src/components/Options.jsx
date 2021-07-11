import React, { useState, useContext } from 'react'
import { Button, TextField, Typography, Grid, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';
import { useStyles } from './OptionsStyles'


const Options = ( { children, idr } ) => {
  const { me, name, setName, leaveCall, callUser, call, callAccepted } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  const [calling, setCalling] = useState(false)
  const [idrcvd, setIdRcvd] = useState(idr)
  
  // using query from email received
  if(idrcvd) {
    setIdToCall(idr)
    setIdRcvd(idr)
  }

  // Email to send
  const email = `mailto:?subject=Video-Chat ID&body=Hi, %0d%0a%09 
    ${name || 'Anonymous'}, Would like to Video-Chat! 
    %0d%0a%0d%0aClick on the Link Below then press CALL in the App
    %0d%0a%0d%0a%0d%0a jpAIsys-Application: %0d%0a ${process.env.REACT_APP_NODE_DEV === 'yes' ? process.env.REACT_APP_URL_DEV : process.env.REACT_APP_URL}/?id=${me}`

  // handle Call button click
  const handleClick = () => {
    if(idr && !idToCall) {
      callUser(idr)
    } else {
      callUser(idToCall)
    }
    setCalling(!calling)
  }
  

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Typography className={classes.statusBar} variant="h6" gutterBottom>
                <span
                  className={classes.span} 
                  style={!me ? { background: 'red', color: 'white' } : { background: 'green', color: 'white' }}
                >
                  {me ? "** ONLINE **" : "** OFFLINE **"}
                </span>
            </Typography>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant="h6" gutterBottom>Account Info</Typography>
              <TextField label="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin }>
                <Button 
                  target="_blank" 
                  href={email} 
                  variant="contained" 
                  color="primary"  
                  fullWidth 
                  startIcon={<Assignment fontSize="large"/>}
                >
                  Email Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant="h6" gutterBottom>Make a call</Typography>
              <TextField label={idr ? idr : "ID to Call"} value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {call.isReceivedCall || callAccepted || calling ? (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fontSize="large"
                  startIcon={<PhoneDisabled fullsize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                  >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fontSize="large"
                  startIcon={<Phone fullsize="large" />}
                  fullWidth
                  onClick={() => handleClick()}
                  className={classes.call}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options
