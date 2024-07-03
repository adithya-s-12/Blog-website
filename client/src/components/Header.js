import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state
  const [value, setValue] = useState();

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            My Blogging Website
          </Typography>
          {isLogin && (
            <Box display="flex" sx={{ flexGrow: 1, justifyContent: "center" }}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
                indicatorColor="secondary"
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display="flex">
            {!isLogin ? (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{
                  margin: 1,
                  color: "white",
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
