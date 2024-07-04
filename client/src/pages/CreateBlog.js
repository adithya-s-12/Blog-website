import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import {URI} from "../data";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${URI}/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={4}
          margin="auto"
          boxShadow={"10px 10px 30px rgba(0, 0, 0, 0.1)"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
          bgcolor="background.paper"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="primary.main"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            fullWidth
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={4}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            fullWidth
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginTop: 3, padding: "10px 20px", borderRadius: 3 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
