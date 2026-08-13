#!/bin/bash

# Docker Setup Validation Script

echo "🔍 Validating Docker setup for Botanical Bliss..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists docker; then
    echo "❌ Docker is not installed"
    exit 1
else
    echo "✅ Docker is installed"
fi

if ! command_exists docker-compose; then
    echo "❌ Docker Compose is not installed"
    exit 1
else
    echo "✅ Docker Compose is installed"
fi

# Check if Docker daemon is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker daemon is not running"
    exit 1
else
    echo "✅ Docker daemon is running"
fi

# Validate docker-compose.yml
echo "📝 Validating docker-compose.yml..."
if docker-compose config >/dev/null 2>&1; then
    echo "✅ docker-compose.yml is valid"
else
    echo "❌ docker-compose.yml has errors"
    exit 1
fi

# Check if required files exist
echo "📁 Checking required files..."

required_files=(
    "docker-compose.yml"
    "botanical-bliss-backend/Dockerfile"
    "botanical-bliss-ui/Dockerfile"
    "botanical-bliss-ui/nginx.conf"
    ".env.example"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

# Check port availability
echo "🔌 Checking port availability..."

ports=(3000 8080 3306)
for port in "${ports[@]}"; do
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        echo "⚠️  Port $port is already in use"
    else
        echo "✅ Port $port is available"
    fi
done

# Check available disk space (need at least 2GB)
echo "💾 Checking available disk space..."
available_space=$(df . | tail -1 | awk '{print $4}')
required_space=2097152  # 2GB in KB

if [ "$available_space" -gt "$required_space" ]; then
    echo "✅ Sufficient disk space available"
else
    echo "⚠️  Low disk space (less than 2GB available)"
fi

echo ""
echo "🎉 Docker setup validation completed!"
echo ""
echo "Next steps:"
echo "1. Copy environment file: cp .env.example .env"
echo "2. Start the application: ./setup.sh"
echo "   OR manually: docker-compose up --build -d"
echo ""