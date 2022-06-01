import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';



const theme = createTheme();

export default function Login() {

  const { handleLogin, handleLoginGoogle, handleResp } = React.useContext(Context);
  let navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email') as string, data.get('password') as string);

  };

  const loginGoogle = async (googleData:  any) => {
    try {
      console.log(googleData);
      let login = await handleLoginGoogle(googleData);
      console.log(login);
      if(login){
        navigate('/dashboard');
      }
   
    } catch (error) {
      console.log(error);
    }
   
}
const handleFailure = (result : any) => {
  console.log(result)
  handleResp('error', 'An error has ocurred');
};

  const login = async (email : string, password : string) => {
    try {
      let login = await handleLogin(email, password);
      console.log(login);
      if(login){
        navigate('/dashboard');
      }
   
    } catch (error) {
      console.log(error);
    }
   
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box component="div" sx={{ display: "flex", justifyContent: "center"}}>
            <GoogleLogin 
                  
                  onSuccess={loginGoogle}
                  onError={() => {
                    console.log('Login Failed');
                  }}
              />
            </Box>
        
            <Grid container>
              <Grid item>
    
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}