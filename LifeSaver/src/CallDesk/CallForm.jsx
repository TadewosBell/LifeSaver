// Helper styles for demo
//import './helper.css';
import { MoreResources, DisplayFormikState } from './helper';

import React from 'react';
import { render } from 'react-dom';
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import MapWidget from "../common/Location";


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
  title:{
    fontSize:50
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const priorities = [
  '',
  'Minor',
  'Important',
  'Drastic'
]

const categories = [
  '',
  'Land',
  'Water'
]

const CallForm = () => {
const classes = useStyles();

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function now(){
  let time = (new Date())
  return time.getFullYear() + "-" 
  + pad(time.getMonth() + 1) + "-" 
  + pad(time.getDate()) + "T" 
  + pad(time.getHours()) + ":" 
  + pad(time.getMinutes());
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
        timeReceived: now(),
        address: '',
        x_coord: null,
        y_coord: null,
        locationNotes: '',
        callerName: '',
        callerNum: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .required('Required'),
        description: Yup.string()
        .required('Required'),
        category: Yup.string()
        .required('Required'),
        priority: Yup.string()
        .required('Required'),
        timeReceived: Yup.string()
        .required('Required'),
        address: Yup.string(),
        locationNotes: Yup.string(),
        callerName: Yup.string(),
        callerNum: Yup.string()
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
              fontSize={400}
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
              label="Select"
              name = "category"
              className={classes.textField}
              value={values.category}
              onChange={handleChange}
              onBlur={ event => {
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
              label="Select"
              name = "priority"
              className={classes.textField}
              value={values.priority}
              onChange={handleChange}
              onBlur={ event => {
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

            <Box>
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
            >
              Now
            </Button>
            </Box>

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
            />

            <MuiPhoneNumber 
              id="callerNum"
              defaultCountry={'us'} 
              value={values.callerNum}
              onChange={value=>{
                setFieldValue('callerNum', value.replace(/\D/g,''))
              }}
              onBlur={handleBlur}
              label="Caller's Phone Number"
              margin="normal"
            />
            </Box>
            <Box>
            <TextField
              id="address"
              placeholder="Address"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address && touched.address}
              label="Address"
              fullWidth
              style={{ margin: 8 }}
              margin="normal"
            />
            </Box>
            <Box>
            <TextField
              id="locationNotes"
              placeholder="Describe the Location..."
              type="text"
              value={values.locationNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.locationNotes && touched.locationNotes}
              label="Location Notes"
              multiline
              rows="2"
              margin="normal"
              variant="outlined"
              fullWidth
              style={{ margin: 8 }}
            />
            </Box>        
            
            <Box display="flex" justifyContent="center">
            <Button variant="outlined" 
              className={classes.button}
              type="button"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
              variant="contained"
            >
              Reset
            </Button>

            <Button variant="outlined" 
              className={classes.button}
              type="submit"
              disabled={isSubmitting}
              variant="contained" 
              color="primary"
            >
              Submit
            </Button>
            </Box>
            </Box>

            <Box margin="normal">
            <MapWidget address={values.address} />
            </Box>
            </Box>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>
    </Container>
  </div>
)};

export default CallForm;
