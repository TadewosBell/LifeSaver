import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { logoutsession } from '../redux/modules/session';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Logout()
{
    const classes = useStyles();
    const dispatch = useDispatch();

    function signOut(){
        dispatch(logoutsession());
        window.location.assign("/Login");
    }
    return(
    <Button
    type="submit"
    color="inherit"
    className={classes.submit}
    onClick={(event)=> signOut(event)}
  >
    LOG OUT
  </Button>
    )
}