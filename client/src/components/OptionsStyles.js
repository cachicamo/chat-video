import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 10,
  },
  statusBar: {
    padding: 10,
    marginRight: 200,
    [theme.breakpoints.down('xs')]: {
      marginRight: 40,
    },
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
  span: {
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small',
      padding: '5px 15px',
    },
  },
  call: {
    marginTop: 20,
    background: 'green',
  },
 }));