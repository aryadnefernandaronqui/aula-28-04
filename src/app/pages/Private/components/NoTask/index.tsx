import { Typography } from '@mui/material';

export function NoTask() {
  return (
    <div className="flex flex-1 justify-center content-center items-center mt-20">
      <Typography variant="h4" component="h4">
        No tasks yet
      </Typography>
    </div>
  );
}
