// Helper styles for demo
//import './helper.css';
import { MoreResources, DisplayFormikState } from './helper';

import React from 'react';
import { render } from 'react-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number'

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
    <Formik
      initialValues={{ 
        title: 'title',
        description: 'description',
        category: categories[0],
        priority: 'priority',
        timeReceived: now(),
        address: 'address',
        x_coord: 'x_coord',
        y_coord: 'y_coord',
        locationNotes: 'locationNotes',
        callerName: 'callerName',
        callerNum: 'callerNum'
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
              className={classes.textField}
              margin="normal"
            />

            {/* {errors.title && touched.title && (
              <div className="input-feedback">{errors.title}</div>
            )} */}

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
              className={classes.textField}
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
            />

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

            <TextField
              id="timeReceived"
              label="Time"
              type="datetime-local"
              value={values.timeReceived}
              className={classes.textField}
              onChange={handleChange}
              onBlur={handleBlur}
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
            >
              Now
            </Button>
            
            <input
              id="address"
              placeholder="Enter your email"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
            <input
              id="x_coord"
              placeholder="Enter your email"
              type="text"
              value={values.x_coord}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
            <input
              id="y_coord"
              placeholder="Enter your email"
              type="text"
              value={values.y_coord}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
           <input
              id="locationNotes"
              placeholder="Enter your email"
              type="text"
              value={values.locationNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
           <input
              id="callerName"
              placeholder="Enter your email"
              type="text"
              value={values.callerName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
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
            />

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>

    <MoreResources />
  </div>
)};

export default CallForm;
