import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../redux/slices";

const Quiz = () => {

  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ answer, setAnswer] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {words} = useSelector((state: {root: StateType}) => state.root);

  const nextHandler = ():void => {
    setResult((prev) => [...prev, answer]);
    setCount(prev => prev+1);
    setAnswer("");
  }

  useEffect(() => {

    if(count > 7) navigate("/result");

    dispatch(saveResult(result));
  }, [result]);

  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      <Typography m={"2rem 0"}>Quiz</Typography>

      <Typography variant="h3"> {count + 1} - {words[count]?.word} </Typography>

      <FormControl>
        <FormLabel sx={{mt: "2rem", mb: "1rem"}}>Meaning</FormLabel>

        <RadioGroup value={answer} onChange={(ans) => setAnswer(ans.target.value)}>
          {
            words[count]?.options.map( (i, index) => (
              <FormControlLabel
                value={i}
                control={<Radio />}
                label={i}
                key={index}
              />
            ))
          }
        </RadioGroup>
      </FormControl>

      <Button sx={{margin: "3rem 0"}} variant="contained" fullWidth onClick={nextHandler} disabled={answer === ""}> {count === 7 ? "Submit" : "Next"} </Button>
    </Container>
  )
}

export default Quiz
