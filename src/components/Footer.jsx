// src/components/Footer.jsx

import { Box, Container, Stack, Typography, IconButton, Link } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
        component="footer" 
      sx={{
        mt: 4,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        py: 2.5,
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <PetsIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Tula’s Pet Adoption
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Built with React + MUI + DynamoDB
            </Typography>
            <IconButton
              size="small"
              color="primary"
              component={Link}
              href="https://github.com/ellene-broome/tulas-pet-adoption"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
