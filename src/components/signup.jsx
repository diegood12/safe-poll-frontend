import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';

import DisplayAlert from './displayAlert';

import { signup } from '@/store/actions/auth';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { useStyles } from '@/styles/form';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  name: {
    id: 'common-messages.name',
  },
  signup: {
    id: 'home-page.signup-act',
  },
  password: {
    id: 'home-page.password',
  },
  passwordAgain: {
    id: 'home-page.password-again',
  },
});

function SignUp({ intl }) {
  const classes = useStyles();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const { name, email, password, re_password } = data;
  const onChange = useCallback(
    (e) =>
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      })),
    []
  );

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(signup(name, email, password, re_password));
    },
    [name, email, password, re_password, dispatch]
  );

  const error = useSelector((state) => state.auth.error);

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        {DisplayAlert(error)}
        <Avatar className={classes.avatar}></Avatar>
        <Typography component='h1' variant='h5'>
          {intl.formatMessage(messages.signup)}
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label={intl.formatMessage(messages.name)}
                autoFocus
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label={intl.formatMessage(messages.password)}
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='re_password'
                label={intl.formatMessage(messages.passwordAgain)}
                type='password'
                id='re_password'
                autoComplete='current-password'
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {intl.formatMessage(messages.signup)}
          </Button>
          <p></p>
        </form>
      </div>
    </Container>
  );
}

export default injectIntl(SignUp);
