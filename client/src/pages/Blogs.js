import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Grid, Typography } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:3100/all-blog");
      if (data?.success) {
        console.log("we r here");
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold", color: "primary.main" }}
      >
        All Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogs &&
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog?._id}>
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
