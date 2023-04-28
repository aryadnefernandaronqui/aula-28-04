/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  Box, Fab, Modal, TextField,
  Typography, useTheme,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { shade } from 'polished';
import dayjs, { Dayjs } from 'dayjs';

import { CustomDatePicker } from './DatePicker';
import { CustomTimePicker } from './TimePicker';
import { useAppDispatch } from '@/app/redux/hooks';
import { taskActions } from '@/app/redux/modules/tasks';

export function NewTask() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));
  const [hour, setHour] = useState<Dayjs>(dayjs(new Date()));
  const [title, setTitle] = useState('');

  const setShade = (): string => {
    const { mode, background } = theme.palette;
    const shadeColor = (v: number) => shade(v, background.paper);
    return mode === 'dark' ? shadeColor(-0.2) : shadeColor(0.2);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setTitle(''); setOpen(false); };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

  const handleSaveTask = async () => {
    dispatch(taskActions.addTask({
      title,
      date: date.toDate(),
      hour: hour.format('HH:mm'),
      done: false,
      hidden: false,
      id: `${Date.now()}`,
    }));

    setTitle('');
    setDate(dayjs(new Date()));
    setHour(dayjs(new Date()));
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={modalStyle}
          className="flex flex-col justify-center items-center rounded-[40px] w-10/12 sm:w-6/12 sm:min-w-[500px] lg:w-5/12 lg:max-w-[800px] "
          color="text.secondary"
        >
          <Box
            component="form"
            autoComplete="off"
            className="flex flex-col justify-center items-center w-full h-full"
          >
            <Typography id="modal-modal-title" variant="h4" component="h4">
              New Task
            </Typography>

            <Box className="flex flex-col flex-1 justify-center content-center items-center w-10/12 md:w-8/12 min-w-[180px] mt-4 gap-4">
              <Box className="flex flex-col flex-1 items-center w-full">
                <Typography variant="h5" component="h5">
                  Title
                </Typography>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  InputProps={{
                    className: 'rounded-full bg-white h-10 text-black',
                    sx: { '& input:focus': { boxShadow: 0 } },
                  }}
                />
              </Box>

              <Box className="flex flex-col flex-1 items-center">
                <Typography variant="h5" component="h5">
                  Date
                </Typography>
                <CustomDatePicker setValue={setDate} value={date} />
              </Box>

              <Box className="flex flex-col flex-1 items-center">
                <Typography variant="h5" component="h5">
                  Hour
                </Typography>
                <CustomTimePicker setValue={setHour} value={hour} />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col flex-1 content-center items-end w-full mt-8 -mb-2 -mr-2">
            <Fab
              color="primary"
              variant="extended"
              aria-label="add"
              onClick={handleSaveTask}
              disabled={title === '' || title.length > 30}
              sx={{
                height: 40,
                backgroundColor: 'background.default',
                color: 'text.primary',
                '&:hover': { backgroundColor: shade(-0.2, theme.palette.background.default) },
              }}
            >
              <Typography variant="body1" className="mr-2 normal-case">Add</Typography>
              <AddCircleOutlineIcon />
            </Fab>
          </Box>
        </Box>
      </Modal>

      <Box className="fixed right-6 bottom-10">
        <Fab
          aria-label="like"
          variant="extended"
          sx={{
            height: 44,
            backgroundColor: 'background.paper',
            color: 'text.secondary',
            '&:hover': { backgroundColor: setShade() },
          }}
          onClick={handleOpen}
        >
          <Typography sx={{ mr: 1 }} className="normal-case">New Task</Typography>
          <AddCircleOutlineIcon />
        </Fab>
      </Box>
    </>
  );
}
