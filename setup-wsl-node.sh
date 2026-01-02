#!/bin/bash
# Script to install Node.js and pnpm in WSL

set -e

echo "Checking for Node.js installation..."

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js is already installed: $NODE_VERSION"
    node --version
else
    echo "Node.js not found. Installing..."
    
    # Check if nvm is installed
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
        echo "nvm found. Loading nvm..."
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        echo "Installing Node.js 20 (LTS)..."
        nvm install 20
        nvm use 20
        nvm alias default 20
    else
        echo "nvm not found. Installing nvm first..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        echo "Installing Node.js 20 (LTS)..."
        nvm install 20
        nvm use 20
        nvm alias default 20
    fi
fi

echo ""
echo "Checking for pnpm installation..."

# Check if pnpm is installed
if command -v pnpm &> /dev/null && ! command -v pnpm | grep -q "/mnt/c"; then
    PNPM_VERSION=$(pnpm --version)
    echo "pnpm is already installed: $PNPM_VERSION"
    pnpm --version
else
    echo "Installing pnpm using corepack (recommended)..."
    
    # Enable corepack (comes with Node.js)
    corepack enable
    
    # Install pnpm using corepack
    corepack prepare pnpm@9.0.0 --activate
    
    echo "pnpm installed successfully!"
    pnpm --version
fi

echo ""
echo "Setup complete! You can now run 'pnpm i' in your project directory."

