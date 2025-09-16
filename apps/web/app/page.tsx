import { Button } from "@nathanhfoster/ui";
import Box from "@nathanhfoster/ui/common/atoms/Box/index";
import Typography from "@nathanhfoster/ui/common/atoms/Typography/index";
import { AdminContextProvider } from "./context/AdminContext";

export default function Home() {
  return (
    <AdminContextProvider>
      <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Box variant="main" className="text-center space-y-6">
          <Typography variant="h1" className="text-4xl font-bold text-gray-900">
            Welcome to Web App
          </Typography>
          <Typography variant="body1" className="text-xl text-gray-600">
            Testing Tailwind CSS integration
          </Typography>

          <Box className="space-y-4">
            <Button color="primary" variant="contained" className="mx-2">
              Primary Button
            </Button>
            <Button color="secondary" variant="outlined" className="mx-2">
              Secondary Button
            </Button>
          </Box>

          {/* Test custom CSS variables from the theme */}
          <Box
            className="mx-auto rounded-lg"
            width="w-32"
            height="h-32"
            bg="primary"
          ></Box>
        </Box>
      </Box>
    </AdminContextProvider>
  );
}
