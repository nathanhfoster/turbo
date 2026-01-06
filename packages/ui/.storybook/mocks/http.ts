/**
 * Mock for Node.js 'http' module in Storybook
 * Since Storybook runs in the browser, Node.js modules like 'http' are not available
 */

// Mock ServerResponse for browser environment
export class ServerResponse {
  writableEnded = false;
  statusCode = 200;
  headers: Record<string, string> = {};

  writeHead(statusCode: number, headers?: Record<string, string>) {
    this.statusCode = statusCode;
    if (headers) {
      Object.assign(this.headers, headers);
    }
    return this;
  }

  end(chunk?: string) {
    this.writableEnded = true;
    return this;
  }

  write(chunk: string) {
    return true;
  }
}




