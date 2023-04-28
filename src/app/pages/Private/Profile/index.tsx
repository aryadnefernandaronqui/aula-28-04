import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { shade } from 'polished';

import {
  Alert,
  AlertColor,
  Box, Button, IconButton, InputAdornment,
  Paper, Snackbar, TextField, Typography, useTheme,
} from '@mui/material';
import {
  HighlightOff as CloseOutlinedIcon,
  Visibility as VisibilityOutlinedIcon,
  VisibilityOff as VisibilityOffOutlinedIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { userActions } from '@/app/redux/modules/user';

export function Profile() {
  const user = useAppSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const [newName, setNewName] = useState<string>(user.name!);
  const [newEmail, setNewEmail] = useState<string>(user.email!);

  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ status: 'success', message: '' });

  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleOpenSnackbar = () => setStateSnackbar(true);
  const handleCloseSnackbar = () => setStateSnackbar(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length < 1) {
      setPasswordIsValid(true);
    } else {
      validator.isStrongPassword(event.target.value, { returnScore: true })
      >= 30 && event.target.value.length >= 5
        ? setPasswordIsValid(true)
        : setPasswordIsValid(false);
    }
  };

  const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);

    event.target.value === password
      ? setPasswordConfirmationIsValid(true)
      : setPasswordConfirmationIsValid(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\s{1,}/, ' ');
    setNewName(input);

    validator.isAlpha(input, undefined, { ignore: ' ' })
      ? setNameIsValid(true)
      : setNameIsValid(false);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);

    validator.isEmail(event.target.value)
      ? setEmailIsValid(true)
      : setEmailIsValid(false);
  };

  const handleClose = () => {
    redirect('/auth');
  };

  const handleSubmit = () => {
  };

  useEffect(() => {
    if (
      nameIsValid && emailIsValid
      && ((passwordIsValid && passwordConfirmationIsValid)
        || (password === '' && passwordConfirmation === ''))
    ) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [nameIsValid, emailIsValid, passwordIsValid, passwordConfirmation, newName, newEmail]);

  useEffect(() => {
    if (user.name === newName && user.email === newEmail) {
      setIsSubmitting(false);
    }
  }, [newName, newEmail, password, passwordConfirmation]);

  useEffect(() => {
    if (password === '' && passwordConfirmation === '') {
      setPasswordIsValid(true);
      setPasswordConfirmationIsValid(true);
    }
  }, [password, passwordConfirmation]);

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  return (
    <Box className="grid grid-rows-12 gap-10 mt-10">

      <Box className="row-span-2 flex flex-1 justify-center items-center">
        <Typography variant="h4">
          Profile
        </Typography>
        <div className=" absolute right-[04%] sm:right-[08%] md:right-[12%] lg:right-1/4 xl:right-[30%]">
          <CloseOutlinedIcon fontSize="large" className="cursor-pointer" onClick={handleClose} />
        </div>
      </Box>

      {/* Form */}
      <Box className="row-span-11 flex flex-col items-center">
        <Paper className="flex flex-1 flex-col rounded-3xl w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 p-4">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="flex flex-col items-center justify-center px-8 gap-4 mb-8"
          >
            {/* Name */}
            <Box className="w-full">
              <Typography variant="body1" className="self-start" color="text.secondary">
                Name
              </Typography>
              <TextField
                value={newName}
                onChange={handleNameChange}
                fullWidth
                error={!nameIsValid}
                helperText={nameIsValid ? '' : 'Name must be only letters and spaces'}
                InputProps={{
                  className: 'rounded-xl bg-white h-10 text-black',
                  sx: { '& input:focus': { boxShadow: 0 } },
                }}
              />
            </Box>

            {/* Email */}
            <Box className="w-full">
              <Typography variant="body1" className="self-start" color="text.secondary">
                Email
              </Typography>
              <TextField
                value={newEmail}
                onChange={handleEmailChange}
                fullWidth
                error={!emailIsValid}
                helperText={emailIsValid ? '' : 'Email must be valid'}
                InputProps={{
                  className: 'rounded-xl bg-white h-10 text-black',
                  sx: { '& input:focus': { boxShadow: 0 } },
                }}
              />
            </Box>

            {/* Passwords */}
            <Box className="w-full flex flex-col sm:flex-row gap-x-10 gap-y-4">
              <Box className="w-full">
                <Typography variant="body1" className="self-start" color="text.secondary">
                  Password
                </Typography>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  error={!passwordIsValid}
                  helperText={passwordIsValid ? '' : 'Password must be at least 5 characters and contain at least one number, one lowercase and one uppercase letter'}
                  fullWidth
                  InputProps={{
                    className: 'rounded-xl bg-white h-10 text-black',
                    sx: { '& input:focus': { boxShadow: 0 } },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: 'primary.light' }}
                        >
                          {
                            showPassword
                              ? <VisibilityOutlinedIcon />
                              : <VisibilityOffOutlinedIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box className="w-full">
                <Typography variant="body1" className="self-start" color="text.secondary">
                  Confirm Password
                </Typography>
                <TextField
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  error={!passwordConfirmationIsValid}
                  helperText={passwordConfirmationIsValid ? '' : 'Passwords must match'}
                  fullWidth
                  InputProps={{
                    className: 'rounded-xl bg-white h-10 text-black',
                    sx: { '& input:focus': { boxShadow: 0 } },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                          edge="end"
                          sx={{ color: 'primary.light' }}
                        >
                          {
                          showPasswordConfirm
                            ? <VisibilityOutlinedIcon />
                            : <VisibilityOffOutlinedIcon />
                        }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* Button */}
          <Box className="flex flex-1 items-center justify-center">
            <Button
              variant="contained"
              className="rounded-xl w-1/2 h-10 normal-case"
              onClick={handleSubmit}
              disabled={!isSubmitting}
              sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                '&:hover': { backgroundColor: shade(-0.2, theme.palette.background.default) },
              }}
            >
              Save
            </Button>

          </Box>
        </Paper>
      </Box>
      {/* SnackBar */}
      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 6 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={feedback.status as AlertColor}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
