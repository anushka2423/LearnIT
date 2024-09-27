import { ArrowBack, VolumeUp } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { translateWords } from '../utils/features';
import { useDispatch, useSelector } from 'react-redux';
import { getWordFail, getWordsRequest, getWordSuccess } from '../redux/slices';
// import Loader from './Loader';

const Learning = () => {
  const[count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {words} = useSelector((state: {root: StateType}) => state.root);

  useEffect(() => {
    dispatch(getWordsRequest());
    
    translateWords(params || "hi")
    .then((arr) => dispatch(getWordSuccess(arr)))
    .catch((err) => dispatch(getWordFail(err)));
  }, []);  
  
  // if(loading) return <Loader />

  const nextHandler = ():void => {
    setCount(prev => prev+1);
  }

  return (
    <Container maxWidth="sm" sx={{p: "1rem"}}>
      <Button onClick={ count === 0 ? () => navigate("/") : () => setCount(prev => prev-1)}> <ArrowBack/> </Button>

      <Typography m={"2rem 0"}>Learning Made Easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant={"h4"}>
          {count + 1} - {words[count]?.word || 'Loading...'}
        </Typography>
        <Typography color={"blue"} variant={"h4"}>
          : {words[count]?.meaning || ''}
        </Typography>

        <Button sx={{ borderRadius: "50%"}}>
          <VolumeUp />
        </Button>
      </Stack>

      <Button onClick={ count === 7 ? () => navigate("/quiz") : () => nextHandler()} sx={{margin: "3rem 0"}} variant='contained' fullWidth> { count === 7 ? "Test" : "Next"} </Button>
    </Container>
  )
}

export default Learning