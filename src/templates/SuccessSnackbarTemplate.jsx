import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SuccessSnackbarTemplate({open, message, onClose}) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      open={open}
      onClose={onClose}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}