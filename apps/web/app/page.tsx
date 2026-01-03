import { Button, Box, Typography } from "@nathanhfoster/ui";
import { AdminContextProvider } from "./context/AdminContext";

export default function Home() {
  return (
    <AdminContextProvider initialState={{ users: [] }}>
      {/* @ts-expect-error - Box type is incompatible with Next.js 15's stricter typing */}
      <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* @ts-expect-error - Box type is incompatible with Next.js 15's stricter typing */}
        <Box variant="main" className="text-center space-y-6">
          {/* @ts-expect-error - Typography type is incompatible with Next.js 15's stricter typing */}
          <Typography variant="h1" className="text-4xl font-bold text-gray-900">
            Welcome to Web App
          </Typography>
          {/* @ts-expect-error - Typography type is incompatible with Next.js 15's stricter typing */}
          <Typography variant="body1" className="text-xl text-gray-600">
            Testing Tailwind CSS integration
          </Typography>

          {/* @ts-expect-error - Box type is incompatible with Next.js 15's stricter typing */}
          <Box className="space-y-4">
            {/* @ts-expect-error - Button type is incompatible with Next.js 15's stricter typing */}
            <Button variant="contained" color="primary" className="mx-2">
              Primary Button
            </Button>
            {/* @ts-expect-error - Button type is incompatible with Next.js 15's stricter typing */}
            <Button variant="outlined" color="secondary" className="mx-2">
              Secondary Button
            </Button>
          </Box>

          {/* Test custom CSS variables from the theme */}
          {/* @ts-expect-error - Box type is incompatible with Next.js 15's stricter typing */}
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
