import Link from "next/link";
import { Box, MailToLink, Typography } from "@nathanhfoster/ui";

export const metadata = {
  title: "Cookie Policy",
  description: "Cookie policy and privacy information for AgentNate PWA",
};

const CookiePolicy = () => {
  return (
    <Box className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Typography variant="h1" className="mb-4" size="text-4xl" weight="font-bold">
        Cookie Policy
      </Typography>
      <Link href="/settings" className="text-primary underline">
        Manage your settings
      </Link>
      <Box className="mt-8 space-y-6">
        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            1. Introduction
          </Typography>
          <Typography variant="p" className="text-gray-700 dark:text-gray-300">
            This Cookie Policy explains how we use cookies and similar technologies to recognize you
            when you visit our website. It outlines what these technologies are, why we use them,
            and your rights to control their use. This policy also covers our Progressive Web
            Application (PWA) features and related data storage mechanisms.
          </Typography>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            2. What Are Cookies and Web Storage?
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-700 dark:text-gray-300">
            Cookies are small text files that are stored on your device when you visit a website.
            They are widely used to make websites work, or work more efficiently, as well as to
            provide information to the website owners. In addition to cookies, modern web
            applications may use other storage mechanisms such as:
          </Typography>
          <Box variant="ul" className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300">
            <Typography variant="li">Local Storage</Typography>
            <Typography variant="li">Session Storage</Typography>
            <Typography variant="li">IndexedDB</Typography>
            <Typography variant="li">Cache Storage (for PWA features)</Typography>
          </Box>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            3. How We Use Cookies and Storage
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-700 dark:text-gray-300">
            We use cookies and other storage mechanisms to enhance your browsing experience by:
          </Typography>
          <Box variant="ul" className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300">
            <Typography variant="li">
              Understanding how our website is used and performing analytics
            </Typography>
            <Typography variant="li">Remembering your preferences and settings</Typography>
            <Typography variant="li">Providing personalized content and features</Typography>
            <Typography variant="li">
              Ensuring the security and performance of our website
            </Typography>
            <Typography variant="li">
              Enabling offline functionality through PWA features
            </Typography>
            <Typography variant="li">
              Storing necessary data for app functionality when offline
            </Typography>
          </Box>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            4. Types of Cookies and Storage We Use
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-700 dark:text-gray-300">
            We may use the following types of cookies and storage:
          </Typography>
          <Box variant="ul" className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300">
            <Typography variant="li">
              <strong>Essential Cookies:</strong> Required for the operation of our website.
            </Typography>
            <Typography variant="li">
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our
              website.
            </Typography>
            <Typography variant="li">
              <strong>Preference Cookies:</strong> Remember your settings and preferences.
            </Typography>
            <Typography variant="li">
              <strong>Marketing Cookies:</strong> Used to deliver advertisements relevant to your
              interests.
            </Typography>
            <Typography variant="li">
              <strong>PWA Storage:</strong> Used for offline functionality and app performance.
            </Typography>
          </Box>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            5. Progressive Web Application (PWA) Features
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-700 dark:text-gray-300">
            Our website functions as a Progressive Web Application, which means it can be installed
            on your device and work offline. To enable these features, we use:
          </Typography>
          <Box variant="ul" className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300">
            <Typography variant="li">
              <strong>Service Workers:</strong> For offline functionality and background sync
            </Typography>
            <Typography variant="li">
              <strong>Cache Storage:</strong> To store website resources for offline use
            </Typography>
            <Typography variant="li">
              <strong>Push Notifications:</strong> To send you important updates (with your
              permission)
            </Typography>
            <Typography variant="li">
              <strong>App Manifest:</strong> To enable installation on your device
            </Typography>
          </Box>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            6. Managing Your Cookie and Storage Preferences
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-700 dark:text-gray-300">
            You can control or disable cookies through your browser settings. For PWA features:
          </Typography>
          <Box variant="ul" className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300">
            <Typography variant="li">
              You can uninstall the PWA from your device at any time
            </Typography>
            <Typography variant="li">
              You can disable push notifications in your browser settings
            </Typography>
            <Typography variant="li">
              You can clear PWA data through your browser's storage settings
            </Typography>
          </Box>
          <Typography variant="p" className="mt-4 text-gray-700 dark:text-gray-300">
            Please note that disabling certain features may affect the functionality of our website
            and PWA capabilities. For more detailed information, refer to your browser's help
            documentation.
          </Typography>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            7. Changes to This Policy
          </Typography>
          <Typography variant="p" className="text-gray-700 dark:text-gray-300">
            We may update this Cookie Policy from time to time to reflect changes in legal,
            technical, or business developments. We encourage you to review this page periodically
            for the latest information on our use of cookies and PWA features.
          </Typography>
        </Box>

        <Box variant="section">
          <Typography variant="h2" className="mb-4" size="text-2xl" weight="font-semibold">
            8. Contact Us
          </Typography>
          <Typography variant="p" className="text-gray-700 dark:text-gray-300">
            If you have any questions about our use of cookies, PWA features, or this policy, please
            contact us at{" "}
            <MailToLink
              email="nathan@agentnate.dev"
              className="underline text-primary"
            >
              nathan@agentnate.dev
            </MailToLink>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CookiePolicy;
