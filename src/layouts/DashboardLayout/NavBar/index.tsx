/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  BarChartIcon,
  BookIcon,
  EditIcon,
  HomeIcon,
  LockIcon,
  SettingsIcon,
} from 'src/icons';
import RouterNames from 'src/routes/names';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_1.png',
  jobTitle: 'Desenvolvedor Pleno',
  name: 'Fulado de Tal',
};

const items = [
  {
    href: RouterNames.HOME,
    icon: HomeIcon,
    title: 'Home',
  },
  {
    href: RouterNames.DASHBOARD,
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: RouterNames.TURMAS,
    icon: BookIcon,
    title: 'Minhas Turmas',
  },
  {
    href: RouterNames.TIPOGRAFIA,
    icon: EditIcon,
    title: 'Tipografia',
  },
  {
    href: RouterNames.SETTINGS,
    icon: SettingsIcon,
    title: 'Settings',
  },
  {
    href: RouterNames.LOGIN,
    icon: LockIcon,
    title: 'Login',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }: any) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to={RouterNames.HOME}
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
