import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';
const styles =  {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#007BFF',
    main: '#007BFF',
    light:colors.blue['50']
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#FAFAFA',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
  
};
export default styles;