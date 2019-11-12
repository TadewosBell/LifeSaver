// Helper styles for demo
// import { MoreResources, DisplayFormikState } from './helper';

import React from 'react';
import { Formik/*, yupToFormErrors*/ } from 'formik';
//import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Yup from 'yup';



/*import clsx from 'clsx';*/
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number'
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';


import MapWidget from "../common/Location";
import { /*submitCall,*/ postCall } from "../Client/LifeSaverClient";


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  title: {
    fontSize: 50
  },
  button: {
    margin: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(1),
  },
  map: {
    margin: theme.spacing(3)
  }
}));

// const priorities = [
//   '',
//   'Minor',
//   'Important',
//   'Drastic'
// ]

const priorities = [
  '',
  'Wolf',
  'Tiger',
  'Demon',
  'Dragon',
  'God'
]

const categories = [
  '',
  'Flood',
  'Tornado',
  'Electrical',
  'Fire',
  'Earthquake'
]

const CallForm = (props) => {
  const classes = useStyles();
  const updateDatabase = props.onUpdate;
  /*
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
  */

  /*
  function now(){
    return (new Date()).toISOString()
    // let time = (new Date())
    // return time.getFullYear() + "-" 
    // + pad(time.getMonth() + 1) + "-" 
    // + pad(time.getDate()) + "T" 
    // + pad(time.getHours()) + ":" 
    // + pad(time.getMinutes());
  }
  
  
  function getDateString(dateString){
    let time = (new Date())
    return time.getFullYear() + "-" 
    + pad(time.getMonth() + 1) + "-" 
    + pad(time.getDate()) + "T" 
    + pad(time.getHours()) + ":" 
    + pad(time.getMinutes());
  }
  */

  const submitFunc = async (values, { setSubmitting }) => {
    let copy = Object.assign({}, values)
    let address = copy.address;
    let details = copy.locationDetails;
    let coordinates = [10, 12];
    delete copy.address;
    delete copy.locationDetails;
    //delete copy.coordinates;
    copy.location = { address, coordinates, details };
    let toSubmit = JSON.stringify(copy, null, 2)
    await postCall(toSubmit);
    try {
      alert(toSubmit);
    }
    catch (e) {
      alert(e)
    }
    setSubmitting(false);
    updateDatabase();
  }

  console.log((new Date()).toISOString())

  return (
    <div className="call-form">
      <Container>
        <Formik
          initialValues={{
            title: '',
            description: '',
            category: categories[0],
            priority: priorities[0],
            //timeReceived: now(),
            address: '',
            //x_coord: null,
            //y_coord: null,
            locationDetails: '',
            callerName: '',
            callerPhoneNumber: ''
          }}
          onSubmit={submitFunc}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .required('Required'),
            description: Yup.string()
              .required('Required'),
            category: Yup.string()
              .required('Required'),
            priority: Yup.string()
              .required('Required'),
            // timeReceived: Yup.string()
            // .required('Required'),
            address: Yup.string()
              .required('Required'),
            locationDetails: Yup.string(),
            callerName: Yup.string()
              .required('Required'),
            callerPhoneNumber: Yup.string()
              .required('Required')
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            } = props;
            return (


              <form /*className={classes.container}*/ onSubmit={handleSubmit}>

                <Box display="flex" flexDirection="row">
                  <Box>
                    <TextField
                      id="title"
                      placeholder="Summarize the Call"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.title && touched.title}
                      required
                      label="Title"
                      margin="normal"
                      fullWidth
                      style={{ margin: 8 }}
                      InputProps={{
                        classes: {
                          input: classes.title,
                        },
                      }}
                    />

                    {/* {errors.title && touched.title && (
              <div className="input-feedback">{errors.title}</div>
            )} */}
                    <Box>
                      <TextField
                        id="description"
                        placeholder="Describe the scenario"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description && touched.description}
                        required
                        label="Description"
                        fullWidth
                        style={{ margin: 8 }}
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                      />
                    </Box>

                    <Box display="flex" justifyContent="center">
                      <TextField
                        id="category"
                        select
                        required
                        label="Category"
                        name="category"
                        className={classes.textField}
                        value={values.category}
                        onChange={handleChange}
                        onBlur={event => {
                          event.target.name = "category"
                          handleBlur(event);
                        }}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        error={errors.category && touched.category}
                        helperText="Please select a category"
                        margin="normal"
                        variant="outlined"
                      >
                        {categories.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="priority"
                        select
                        required
                        label="Priority"
                        name="priority"
                        className={classes.textField}
                        value={values.priority}
                        onChange={handleChange}
                        onBlur={event => {
                          event.target.name = "priority"
                          handleBlur(event);
                        }}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        error={errors.priority && touched.priority}
                        helperText="Please select a priority"
                        margin="normal"
                        variant="outlined"
                      >
                        {priorities.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>

                    {/* <Box>
              <TextField
                id="timeReceived"
                label="Time"
                type="datetime-local"
                value={values.timeReceived}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.timeReceived && touched.timeReceived} //This will still work, as material ui will only save valid dates
              />
              <Button variant="outlined" 
                className={classes.button}
                id="now"
                type="button"
                onClick={() => {setFieldValue('timeReceived', now())}}
                margin="normal"
                color="primary"
              >
                Now
              </Button>
              </Box> */}

                    <Box>
                      <TextField
                        id="callerName"
                        placeholder="Caller Name"
                        type="text"
                        value={values.callerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.callerName && touched.callerName}
                        label="Caller Name"
                        className={classes.textField}
                        margin="normal"
                        required
                      />

                      <MuiPhoneNumber
                        id="callerPhoneNumber"
                        defaultCountry={'us'}
                        value={values.callerPhoneNumber}
                        onChange={value => {
                          setFieldValue('callerPhoneNumber', value.replace(/\D/g, ''))
                        }}
                        onBlur={handleBlur}
                        label="Caller's Phone Number"
                        margin="normal"
                        required
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="address"
                        placeholder="Where is it happening?"
                        type="text"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address && touched.address}
                        label="Address"
                        fullWidth
                        style={{ margin: 8 }}
                        margin="normal"
                        required
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="locationDetails"
                        placeholder="Special hazards, landmarks, etc."
                        type="text"
                        value={values.locationDetails}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.locationDetails && touched.locationDetails}
                        label="Location Notes"
                        multiline
                        rows="2"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        style={{ margin: 8 }}
                      />
                    </Box>

                    <Grid container alignItems="center">
                      <Button
                        className={classes.button}
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                        variant="contained"
                      >
                        Reset
              </Button>

                      <Button
                        className={classes.button}
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                      >
                        Submit
              </Button>
                      {isSubmitting ? (
                        <CircularProgress className={classes.progress} size={24} />
                      ) : (
                          <div />
                        )}
                    </Grid>
                  </Box>

                  <Box margin="normal" bgcolor="white.300" className={classes.map}>
                    <MapWidget address={values.address} />
                  </Box>
                </Box>
                {/* <DisplayFormikState {...props} />   */}
              </form>
            );
          }}
        </Formik>
      </Container>
    </div>
  )
};

//            

export default CallForm;
