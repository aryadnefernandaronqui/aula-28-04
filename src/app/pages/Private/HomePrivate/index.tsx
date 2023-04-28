import { useState, useEffect } from 'react';

import {
  Alert, Box, CircularProgress, Pagination,
  Snackbar, Tab, Tabs,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectorTasks } from '@redux/modules/tasks';

import { NoTask } from '../components/NoTask';
import { NewTask } from '../components/NewTask';
import { Task } from '../components/Task';
import { usersActions } from '@/app/redux/modules/users';

type TTabValue = 'all' | 'completed' | 'incomplete' | 'hidden';

export function HomePrivate() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  /* const tasksRedux = useAppSelector(selectorTasks.selectAll); */
  const userLogged = useAppSelector((state) => state.user);
  const [tasks, setTasks] = useState(userLogged.tasks);

  const [stateSnackbar, setStateSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [maxTaskPerPage] = useState(window.innerHeight > 700 ? 10 : 7);
  const [pages, setPages] = useState(Math.ceil(tasks.length / 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [taskPage, setTaskPage] = useState(tasks.slice(0, maxTaskPerPage));

  const [tab, setTab] = useState<TTabValue>('incomplete');

  const handleChangePagination = (_: any, value: number) => {
    setCurrentPage(value);
    setTaskPage(tasks.slice((value - 1) * maxTaskPerPage, value * maxTaskPerPage));
  };
  const handleSetMessage = (message: string) => setSnackbarMessage(message);
  const handleOpenSnackbar = () => setStateSnackbar(true);
  const handleCloseSnackbar = () => setStateSnackbar(false);

  const handleFilterTasks = (filter:TTabValue) => {
    switch (filter) {
      case 'all':
        setTasks(userLogged.tasks);
        break;
      case 'completed':
        setTasks(userLogged.tasks.filter((task) => task.done && !task.hidden));
        break;
      case 'incomplete':
        setTasks(userLogged.tasks.filter((task) => !task.done && !task.hidden));
        break;
      case 'hidden':
        setTasks(userLogged.tasks.filter((task) => task.hidden));
        break;
      default:
        setTasks(userLogged.tasks);
    }
  };

  useEffect(() => {
    setLoading(false);
    handleFilterTasks(tab);

    dispatch(usersActions.updateUser({ id: userLogged.email, changes: userLogged }));
  }, [userLogged]);

  useEffect(() => {
    setPages(Math.ceil(tasks.length / maxTaskPerPage));
  }, [tasks]);

  useEffect(() => {
    setTaskPage(tasks.slice((currentPage - 1) * maxTaskPerPage, currentPage * maxTaskPerPage));
  }, [currentPage, tasks]);

  useEffect(() => {
    handleFilterTasks(tab);
    setTaskPage(tasks.slice(0, maxTaskPerPage));
    setPages(Math.ceil(tasks.length / maxTaskPerPage));
  }, []);

  return (
    <Box className="flex flex-col flex-1">
      {loading && <CircularProgress />}
      {/* {!loading && tasksRedux.length === 0 && (<NoTask />)} */}

      {!loading && (
        <>
          <Tabs
            variant="fullWidth"
            textColor={'text.primary' as 'primary'}
            indicatorColor={undefined}
            value={tab}
            onChange={(_, value) => { setTab(value); handleFilterTasks(value); }}
            className="mb-4 sm:mx-6"
            sx={{ minHeight: '36px', '& div': { height: '2.2rem' }, '& .MuiTabs-indicator': { backgroundColor: 'background.paper' } }}
          >
            <Tab label="Incomplete" className="normal-case" value="incomplete" />
            <Tab label="All" className="normal-case" value="all" />
            <Tab label="Completed" className="normal-case" value="completed" />
            <Tab label="Hidden" className="normal-case" value="hidden" />
          </Tabs>

          <Box className="flex flex-col gap-2 mx-2 md:mx-6 lg:mx-10 xl:mx-20">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleOpenSnackbar={handleOpenSnackbar}
                handleSetMessage={handleSetMessage}
              />
            ))}
            { pages > 1 && (
              <Box className="self-start my-6">
                <Pagination count={pages} page={currentPage} onChange={handleChangePagination} />
              </Box>
            )}
          </Box>
        </>
      )}

      {/* float button  */}
      <NewTask />

      {/* snackbar feedback action */}
      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ mt: 6 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
