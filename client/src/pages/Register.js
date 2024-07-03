import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
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
      const { data } = await axios.post("http://localhost:3100/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      console.log(data);
      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
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
            Register
          </Typography>
          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
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
            onChange={handleChange}
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
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 2, padding: "10px 20px" }}
            variant="outlined"
            color="secondary"
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
