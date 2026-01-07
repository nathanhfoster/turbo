import { Box, Typography } from "@nathanhfoster/ui";

export default function Home() {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen p-8">
      <Typography variant="h1" className="mb-4" size="text-4xl" weight="font-bold">
        Astral Poet
      </Typography>
      <Typography variant="p" className="text-gray-600 dark:text-gray-400">
        A personal diary and journaling app with rich text editing
      </Typography>
      <Typography variant="p" className="mt-4 text-sm text-gray-500 dark:text-gray-500">
        Routes are being migrated from Pages Router to App Router...
      </Typography>
    </Box>
  );
}

