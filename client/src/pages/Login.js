import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3100/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 30px rgba(0, 0, 0, 0.1)"
          padding={4}
          borderRadius={5}
          bgcolor="background.paper"
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", fontWeight: "bold", color: "primary.main" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={(e) => handleChange(e)}
            fullWidth
            variant="outlined"
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={(e) => handleChange(e)}
            fullWidth
            variant="outlined"
          />

          <Button onClick={(e) => handleSubmit(e)}
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3, padding: "10px 20px" }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 2, padding: "10px 20px" }}
            variant="outlined"
            color="secondary"
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
