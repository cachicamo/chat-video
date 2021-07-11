import React, { useState, useEffect } from 'react';
import { Typography, AppBar } from '@material-ui/core';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import { useStyles } from './AppStyles'

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

const App = () => {
  const classes = useStyles();
  const [idrcvd, setIdRcvd] = useState('');
  
  useEffect(() => {
    setIdRcvd(getQueryVariable('id'));
    return () => {
      console.log('End')
    }
  }, [])
  
  if (idrcvd === 'undefined') {
    setIdRcvd('No')
  }

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h3" align="center">Video Chat</Typography>
      </AppBar>

      <VideoPlayer />

      <Options idr={idrcvd}>
        <Notifications />
      </Options>
    </div>
  )
}

export default App
