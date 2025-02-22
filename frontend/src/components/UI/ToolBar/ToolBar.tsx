import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks.ts";
import { userFromSlice } from "../../../features/users/usersSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousUserMenu from "./AnonymousUserMenu.tsx";

const ToolBar = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(0,0,0,0.79)", padding: "10px 0" }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component={NavLink}
                sx={{
                  flexGrow: 1,
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(to right, #f83600, #f9d423)",
                  WebkitBackgroundClip: "text",
                  fontWeight: "bold",
                  fontSize: "35px",
                  textDecoration: "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundPosition: "right center",
                    color: "#fff",
                    textShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
                  },
                }}
                to={"/"}
              >
                Photo gallery
              </Typography>
            </Box>
            {user ? <UserMenu user={user} /> : <AnonymousUserMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;
