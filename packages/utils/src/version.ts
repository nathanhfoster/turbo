// Import the entire package.json as a default import
import pkg from '../package.json';

// Export the version as a constant
export const VERSION = pkg.version;

// Export a function to get the version
export const getVersion = () => VERSION;
