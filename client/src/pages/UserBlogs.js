import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Grid, Typography } from "@mui/material";
import {URI} from "../data";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user,setUser] = useState();

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`${URI}/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setUser(data?.userBlog);
        console.log(blogs);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
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
        My Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={user.username}
                time={blog.createdAt}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center", marginTop: 4 }}>
            You haven't created a blog yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default UserBlogs;
