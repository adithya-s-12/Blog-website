import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3100/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:3100/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        border={3}
        borderRadius={10}
        padding={4}
        margin="auto"
        boxShadow={"10px 10px 30px rgba(0, 0, 0, 0.1)"}
        display="flex"
        flexDirection={"column"}
        marginTop="50px"
        bgcolor="background.paper"
      >
        <Typography
          variant="h3"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="primary.main"
        >
          Update A Post
        </Typography>
        <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "text.primary" }}
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
          sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "text.primary" }}
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
          sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "text.primary" }}
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
          sx={{ mt: 3, alignSelf: "center", padding: "10px 30px" }}
        >
          UPDATE
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetails;
