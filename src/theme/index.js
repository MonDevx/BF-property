import { createMuiTheme } from '@material-ui/core';
import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  palette,
  typography,
  
  overrides,
  overrides: {
    MuiChip: {
        root: {
          margin: '3px',
            fontFamily: ['prompt'].join(','),           
            fontSize: "13px"
        },
    },
},
});

export default theme;
