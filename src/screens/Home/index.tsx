import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EsgForm from "../../components/EsgForm";
import Container from '@mui/material/Container';


export default function Home() {
  return (
    <Box component="div" sx={{}}>
      <Container component="main" maxWidth="xs">
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper sx={{p:2, m: 1}}>
            <EsgForm />
            </Paper>
      
          </Grid>
        </Container>
    </Box>
    
  );
}
