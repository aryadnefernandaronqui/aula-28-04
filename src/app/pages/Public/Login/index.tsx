import { Box } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import { useSelector } from 'react-redux';
import { typeReducers } from '@/app/redux/modules/rootReducer';
import { toggleFlipCard } from '@/app/redux/modules/cardFlipper';
import { useAppDispatch } from '@/app/redux/hooks';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function Login() {
  const isFlipped = useSelector((state: typeReducers) => state.cardFlipper);
  const dispatch = useAppDispatch();

  const handleFlip = () => {
    dispatch(toggleFlipCard(!isFlipped));
  };

  return (
    <div className="flex items-center px-4 mt-10 overflow-hidden">
      <Box className="flex flex-1 justify-center content-center items-center">

        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={1}
          flipSpeedFrontToBack={1}
        >
          <SignIn handleFlip={handleFlip} />

          <SignUp handleFlip={handleFlip} />
        </ReactCardFlip>
      </Box>
    </div>
  );
}
