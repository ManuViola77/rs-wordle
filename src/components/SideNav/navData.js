import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';

export const navData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: 'Home',
    link: '/',
    exact: true,
  },
  {
    id: 1,
    icon: <LeaderboardIcon />,
    text: 'Ranking',
    link: '/ranking',
    exact: true,
  },
  {
    id: 2,
    icon: <ShowChartIcon />,
    text: 'Statistics',
    link: '/statistics',
    exact: true,
  },
  {
    id: 3,
    icon: <GroupIcon />,
    text: 'Users',
    link: '/users',
    exact: true,
  },
  {
    id: 4,
    icon: <InfoIcon />,
    text: 'Rules',
    link: '/rules',
    exact: true,
  },
  {
    id: 5,
    icon: <SettingsIcon />,
    text: 'Settings',
    link: '/settings',
    exact: true,
  },
];
