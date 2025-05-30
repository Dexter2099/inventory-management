#!/usr/bin/env bash
set -e

# Install .NET SDK if missing
if ! command -v dotnet >/dev/null 2>&1; then
  echo "Installing .NET SDK..."
  wget -q https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  sudo dpkg -i packages-microsoft-prod.deb
  rm packages-microsoft-prod.deb
  sudo apt-get update
  sudo apt-get install -y dotnet-sdk-9.0
fi

# Install Node.js and npm if missing
if ! command -v npm >/dev/null 2>&1; then
  echo "Installing Node.js and npm..."
  sudo apt-get update
  sudo apt-get install -y nodejs npm
fi

# Install Vite globally if missing
if ! command -v vite >/dev/null 2>&1; then
  echo "Installing Vite..."
  sudo npm install -g vite
fi

echo "All dependencies installed"
