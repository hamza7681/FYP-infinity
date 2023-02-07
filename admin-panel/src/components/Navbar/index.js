import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "../../Assets/I.png";
import { HiBars3CenterLeft } from "react-icons/hi2";
import {
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { AiOutlineBarChart, AiOutlinePoweroff } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import pic from "../../Assets/user-logo.jpg";
import HomePage from "../../pages/HomePage";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { MdFeedback } from "react-icons/md";

const drawerWidth = 240;

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: <ImBooks />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <GiShoppingCart />,
  },
  {
    name: "Tutors",
    path: "/tutors",
    icon: <FaGraduationCap />,
  },
  {
    name: "Students",
    path: "/students",
    icon: <FaUsers />,
  },
  {
    name: "Feedbacks",
    path: "/feedbacks",
    icon: <MdFeedback />,
  },
];

const colorsApp = [
  "#1a2035",
  "#ffffff",
  "#1572E8",
  "#6861CE",
  "#31CE36",
  "#FFAD46",
  "#F25961",
];

const bgColors = ["#1a2035", "#ffffff"];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: "#2A2F5B",
  opacity: 0.95,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#2A2F5B",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { appBarColor, appBackground } = useSelector((s) => s.ThemeReducer);
  const [navbg, setNavbg] = React.useState(0);
  const [appbg, setAppbg] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <HiBars3CenterLeft className="md:block hidden" />
          </IconButton>
          <HiBars3CenterLeft className="md:hidden block text-[24px] absolute left-[10px]" />
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-[22px]">Infinite Institute</h1>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row justify-between items-center w-[60px]">
                <div className="relative">
                  <FaBell className="text-[22px]" />
                  <div className="bg-green-600 absolute top-[-5px] right-[-5px] h-[15px] w-[15px] rounded-full flex justify-center items-center ">
                    <span className="text-[13px]">1</span>
                  </div>
                </div>
                <AiOutlinePoweroff
                  className="text-[22px] cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                    localStorage.removeItem("token");
                  }}
                />
              </div>
              <div
                className=" w-fit  flex justify-center items-center bg-white px-[14px] py-[10px] rounded-[10px] z-10 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                <FiSettings className="text-black text-[22px] rotate-infinite cursor-pointer" />
              </div>
              {show ? (
                <div className="absolute top-[70px] rounded-[10px] right-[60px] flex flex-col bg-white w-[300px] rounded- [10px] z-10 border-[2px] shadow-lg ">
                  <div className="bg-[#5867dd] py-[7px] px-[10px] rounded-t-[10px] ">
                    <p className="text-white ">Settings</p>
                  </div>
                  <div className="px-[20px] py-[20px]">
                    <p>Navbar Color</p>
                    <div className="flex flex-row gap-4 mt-[10px]">
                      {colorsApp.map((val, index) => {
                        return (
                          <>
                            <div
                              className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
                                navbg === index
                                  ? "border-[2px] border-gray-700"
                                  : "border-[2px] border-gray-300"
                              }`}
                              style={{ background: val }}
                              onClick={() => {
                                setNavbg(index);
                                dispatch({ type: "APP_BAR", payload: val });
                              }}
                            ></div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="px-[20px] py-[20px]">
                    <p>Background Color</p>
                    <div className="flex flex-row gap-4 mt-[10px]">
                      {bgColors.map((val, index) => {
                        return (
                          <>
                            <div
                              className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
                                appbg === index
                                  ? "border-[2px] border-blue-700"
                                  : "border-[2px] border-gray-400"
                              }`}
                              style={{ background: val }}
                              onClick={() => {
                                setAppbg(index);
                                dispatch({ type: "APP_BACK", payload: val });
                              }}
                            ></div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className="md:block hidden absolute "
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <img
            className="h-[50px] relative left-[20px] "
            src={logo}
            alt="logo"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <FaChevronRight className="text-white text-[19px]" />
            ) : (
              <FaChevronLeft className="text-white text-[19px]" />
            )}
          </IconButton>
        </DrawerHeader>
        <div
          style={{ background: appBarColor }}
          className={`h-screen  opacity-[0.95] px-[10px] pt-[10px]`}
        >
          <div className="flex flex-col justify-center items-center py-[10px]">
            <img
              src={pic}
              alt="logo"
              className={` rounded-full ${open ? "h-[80px]" : "h-[40px]"}`}
            />
            {open ? (
              <h1
                className={`${
                  appBarColor === "#ffffff" ? "text-black" : "text-white"
                } font-semibold py-[7px]`}
              >
                Administrator
              </h1>
            ) : (
              ""
            )}
          </div>
          <div className="border-b-[1px] my-[10px]"></div>

          <List>
            {routes.map((val, index) => (
              <Link key={index} to={val.path} onClick={handleDrawerClose}>
                <ListItem
                  className={`hover:bg-[#808ae4]  rounded-[3px] mb-[10px] ${
                    val.path === pathname ? "bg-[#808ae4]" : ""
                  }`}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className={`text-[22px] ${
                          appBarColor === "#ffffff"
                            ? "text-black"
                            : "text-white"
                        } hover:text-white`}
                      >
                        {val.icon}
                      </span>
                    </ListItemIcon>
                    {open ? (
                      <span
                        className={`${
                          appBarColor === "#ffffff"
                            ? "text-black"
                            : "text-white"
                        } font-semibold`}
                      >
                        {val.name}
                      </span>
                    ) : (
                      ""
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
      <Box
        className="  h-auto  "
        component="main"
        sx={{ flexGrow: 1, p: 3, background: appBackground }}
      >
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Navbar;
