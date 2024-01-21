#!/usr/bin/env


# Install modules / dependencies
npm install

# Build dist
npm run build

# Add API Gateway URL ENV var
echo "VITE_BASE_URL=$VITE_BASE_URL" > .env

# Build
npm run build