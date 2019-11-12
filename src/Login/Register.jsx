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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as LifeSaverClient from '../Client/LifeSaverClient';
import { Redirect } from 'react-router/cjs/react-router.min';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = React.useState('');
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const handleChange = event => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function validate(){
    var valid = true;
    if(firstName == '' || lastName == '' || email == '' || role == '' || password == '' ){
      valid =  false;
    }
    return valid;
  }

  async function signUp(event){
    event.preventDefault();
    const valid = validate();
    if(!valid)return;
    try{
      const res = await LifeSaverClient.signUp(firstName, lastName, email,role, password);

      console.log(res);
      if(res.error){
        dispatch(showSnackbar(ERROR_SNACKBAR, res.error))
      }
      else if(res.registered){
        dispatch(showSnackbar(SUCCESS_SNACKBAR, 'Signed up successfully!'));
        history.push('/Login');
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
          Sign up
        </Typography>
        { message &&     
                <Typography component="h2" variant="h5">
                {message}
                </Typography>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value = {firstName}
                onChange={e => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value = {lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value = {email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Choose Role
            </InputLabel>
              <Select
                variant="outlined"
                required
                fullWidth
                placeholder="Choose Role"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={role}
                onChange={handleChange}
              >
                <MenuItem value={'first responder'}>First Responder</MenuItem>
                <MenuItem value={'volunteer'}>Volunteer</MenuItem>
                <MenuItem value={'mission management'}>Mission Managment</MenuItem>
                <MenuItem value={'operation cheif'}>Operation Cheif</MenuItem>
                <MenuItem value={'call specialist'}>Call Specialist</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value = {password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event)=> signUp(event)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <SuccessSnackbar />
      <ErrorSnackbar/>
    </Container>
  );
}