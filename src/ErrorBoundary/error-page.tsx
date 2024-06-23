import { Container, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          We apologize for the inconvenience. Please try again later.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" component={RouterLink} to="/">
        Go back to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
