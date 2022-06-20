import { createTheme } from "@mui/material";

declare module '@material-ui/core/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }
  
  export const theme = createTheme({
    typography: {
        fontFamily: 'Inter'
        
    },
    palette: {
        success: {
            main: "#22c55e"
        },
        error: {
           main: "#ef4444" 
        }
    }
  });
  