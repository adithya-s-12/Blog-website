import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {URI} from "../data"

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${URI}/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%" },
        margin: "auto",
        mt: 4,
        mb: 4,
        padding: 2,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "10px 10px 25px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit} sx={{ marginRight: 1 }}>
            <ModeEditIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="user">
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {username}
          </Typography>
        }
        subheader={new Date(time).toLocaleDateString()}
      />
      <CardMedia component="img" height="250" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
