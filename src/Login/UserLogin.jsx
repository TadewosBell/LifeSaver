import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router/cjs/react-router.min';
import * as LifeSaverClient from '../Client/LifeSaverClient';
import { useHistory } from "react-router-dom";
import {ErrorSnackbar, ERROR_SNACKBAR} from "../common/SnackbarTypes"
//import CustomizedSnackbars from "../CustomSnackBar";
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../redux/modules/snackbar';
import { SuccessSnackbar, SUCCESS_SNACKBAR } from '../common/SnackbarTypes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        UMBC Life Saver
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserLogin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const handleClose = (event, reason) => {

  };



 async function signIn(event){
    event.preventDefault();


      try{
        const res = await LifeSaverClient.signIn(email, password);

        console.log(res);
        if(res.error){
          dispatch(showSnackbar(ERROR_SNACKBAR, res.error))
        }
        else if(res.registered){
          dispatch(showSnackbar(SUCCESS_SNACKBAR, 'Logged in successfully!'));
          console.log(res.access_token);
          sessionStorage.setItem('jwt_token', res.access_token);
          sessionStorage.setItem("loggedIn", true)
          
        }
      }
      catch(err){
        console.log(err);
      }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event)=> signIn(event)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Login/Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <SuccessSnackbar />
      <ErrorSnackbar/>
    </Container>
  );
}