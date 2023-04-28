import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
// import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';

import {
  Box, Button, Checkbox, IconButton, InputAdornment,
  FormControlLabel, Paper, TextField, Typography,
} from '@mui/material';
import {
  Visibility as VisibilityOutlinedIcon,
  VisibilityOff as VisibilityOffOutlinedIcon,
} from '@mui/icons-material';

// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { userActions } from '@redux/modules/user';
// import { usersSelectors } from '@/app/redux/modules/users';

type SignInProps = {
  handleFlip: () => void;
}

export function SignIn({ handleFlip }: SignInProps) {
  // const redirect = useNavigate();
  // const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  // const userExists = useAppSelector((state) => usersSelectors.selectById(state, email));

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (validator.isEmail(event.target.value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length >= 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (isSubmitting) {
    //   if (userExists) {
    //     dispatch(userActions.login({
    //       ...userExists,
    //       remember: rememberMe,
    //     }));
    //     redirect('/auth');
    //   } else {
    //     alert('Usuário não encontrado!');
    //   }
    // }
  };

  useEffect(() => {
    if (
      emailIsValid && passwordIsValid
      && email.length > 0 && password.length > 0
    ) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [emailIsValid, passwordIsValid, email, password]);

  return (
    <Box className="flex flex-1 justify-center content-center items-center ">
      <Paper className="p-8 max-w-md w-full space-y-8">
        <Box className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <Typography className="mt-6 text-center text-3xl font-bold tracking-tight text-inherit">
              Sign in to your account
            </Typography>
            <Typography variant="body1" className="mt-2 text-center text-sm">
              Or{' '}
              <button
                className="font-medium text-indigo-800 hover:text-indigo-700"
                onClick={handleFlip}
                type="button"
              >
                create account
              </button>
            </Typography>
          </div>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <Box className="rounded-md shadow-sm text-inherit">
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                error={!emailIsValid}
                helperText={emailIsValid ? '' : 'Please enter a valid email'}
                InputProps={{
                  className: 'rounded-t-md sm:text-sm text-inherit border-inherit',
                  sx: { '& input:focus': { boxShadow: 0 } },
                }}
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                className="mt-4"
                error={!passwordIsValid}
                helperText={passwordIsValid ? '' : 'Password must be at least 5 characters'}
                InputProps={{
                  className: 'rounded-t-md sm:text-sm text-inherit border-inherit',
                  sx: { '& input:focus': { boxShadow: 0 } },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="flex flex-col items-center justify-between sm:flex-row">
              <FormControlLabel
                className="flex items-center mr-[0.2rem] sm:mr-0"
                control={(
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleRememberMeChange}
                    checked={rememberMe}
                  />
              )}
                label="Remember me"
              />
            </Box>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30"
                disabled={!isSubmitting}
              >
                Sign in
                <span className="flex items-center pl-3">
                  {!isSubmitting && (
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  )}

                  {isSubmitting && (
                    <LockOpenIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  )}
                </span>
              </Button>
            </div>
          </Box>
        </Box>
      </Paper>
    </Box>

  );
}
