import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CSSObject,
  Theme,
  Button,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { logOut } from '../../../redux/features/auth/authSlice';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'var(--main)',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  backgroundColor: 'var(--main)',
  boxSizing: 'border-box',
  height: '100%',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export function Sidebar({
  listItems,
}: {
  listItems: { label: string; to: string; icon: JSX.Element }[];
}) {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open && (
          <p style={{ fontWeight: 700, fontSize: '1.5rem' }}>ScrapeSense</p>
        )}
        <IconButton onClick={() => setOpen((prev) => !prev)}>
          {!open ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List style={{ height: '100%' }}>
        {listItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link}
              to={item.to}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ margin: '1rem' }}
      >
        Logout
      </Button>
    </Drawer>
  );
}
