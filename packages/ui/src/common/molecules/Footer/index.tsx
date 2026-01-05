import Box from "./../../atoms/Box";
import Typography from "../../atoms/Typography";
import FooterLink from "./components/FooterLink";
import FooterTypography from "./components/FooterTypography";
import {
  COMPANY_LINKS,
  LEGAL_LINKS,
  RESOURCE_LINKS,
  SOCIAL_LINKS,
} from "./constants";

const Footer = () => {
  return (
    <Box variant="footer" className="px-4 py-12 md:px-8">
      <Box className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        {/* Logo & Mission */}
        <Box>
          <FooterTypography variant="h2" color="primary">
            Local Impact
          </FooterTypography>
          <FooterTypography variant="p" color="foreground-muted">
            Making local impact visible and measurable.
          </FooterTypography>
          <Box className="mt-6 flex space-x-4">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <FooterLink
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
              >
                {icon}
              </FooterLink>
            ))}
          </Box>
        </Box>

        {/* Company Links */}
        <Box>
          <FooterTypography variant="h3">Company</FooterTypography>
          <Box variant="ul" className="mt-4 space-y-2">
            {COMPANY_LINKS.map(({ label, href }) => (
              <Typography key={label} variant="li">
                <FooterLink href={href}>{label}</FooterLink>
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Resources */}
        <Box>
          <FooterTypography variant="h3">Resources</FooterTypography>
          <Box variant="ul" className="mt-4 space-y-2">
            {RESOURCE_LINKS.map(({ label, href }) => (
              <Typography key={label} variant="li">
                <FooterLink href={href}>{label}</FooterLink>
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Legal */}
        <Box>
          <FooterTypography variant="h3">Legal</FooterTypography>
          <Box variant="ul" className="mt-4 space-y-2">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Typography key={label} variant="li">
                <FooterLink href={href}>{label}</FooterLink>
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="mt-12 border-t border-border pt-6 text-center">
        <FooterTypography variant="p" color="foreground-muted">
          © {new Date().getFullYear()} Local Impact. All rights reserved.
        </FooterTypography>
      </Box>
    </Box>
  );
};

export default Footer;
