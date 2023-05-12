import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Menu,
  MenuItem
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOffOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarViewMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutline,
  PublicOutlined,
  CalendarMonth,
  ChevronLeftOutlined,
  Inventory2Outlined,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Classes",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Teachers",
    icon: <Groups2Outlined />,
  },
  {
    text: "History",
    icon: <WorkHistoryOutlined />,
  },
  {
    text: "Transactions ",
    icon: <PublicOffOutlined />,
  },
  {
    text: "Statistics",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarViewMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutline />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Perfomance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {

  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  const [active, setActive] = useState("");

  const navigate = useNavigate();

  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "&.MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundcolor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box
            width="100%"
            sx={{
              backgroundColor: theme.palette.background.alt,
            }}
          >
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4">LIBRARY</Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronLeftOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
              {/* LIBRARIAN PROFILE */}
            <Box  bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Avatar
                alt="profile"
                src="https://media.istockphoto.com/id/502581380/photo/portrait-of-an-african-american-man-with-glasses.jpg?s=612x612&w=0&k=20&c=cjS24yXM56lie7N-KsFtDH2CKCaS03OQFxwJgIag0ac="
            
                height="40px"
                width="40px"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {`bituri`}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {`librarian`}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                id="gauge-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="false"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </FlexBetween>
          </Box>

          </Box>
          {/* WHERE THE USER PROFILE IS AT COLOR UNMATCH */}

          <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'gauge-button',
        }}
        sx={{"& .MuiList-root":{
          backgroundColor:""
        }}}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
