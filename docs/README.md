# Documentation Index

This directory contains all documentation for the Botanical Bliss project.

## 📚 Available Documentation

### Setup & Deployment
- **[Docker Setup](DOCKER.md)** - Complete Docker and Docker Compose setup guide
- **[Security Guide](SECURITY.md)** - Environment variables and secrets management

### General
- **[Help](HELP.md)** - General help and troubleshooting

## 🛠️ Quick Links

- [Main README](../README.md) - Project overview
- [Scripts](../scripts/)  - Setup and utility scripts
- [Docker Compose](../docker-compose.yml) - Container orchestration
- [Environment Template](../.env.example) - Environment variables template

## 📁 Project Structure

```
botanical-bliss-store/
├── docs/                    # 📚 All documentation
│   ├── DOCKER.md           # Docker setup guide
│   ├── SECURITY.md         # Security and environment setup
│   ├── DISCOUNT_API.md     # API documentation
│   ├── IMAGE_UPLOAD_API.md # File upload documentation
│   └── HELP.md             # General help
├── scripts/                # 🛠️ Setup and utility scripts
│   ├── setup.sh           # Main setup script
│   ├── check-tokens.sh     # Token verification
│   └── validate-setup.sh   # Pre-setup validation
├── botanical-bliss-backend/   # 🌐 Spring Boot backend
├── botanical-bliss-ui/        # 🖥️ React frontend
├── README.md               # 📖 Main project documentation
├── docker-compose.yml      # 🐳 Container orchestration
└── .env.example           # ⚙️ Environment template
```

## 🚀 Getting Started

1. **Read the main [README](../README.md)** for project overview
2. **Follow [Docker Setup](DOCKER.md)** for local development
3. **Configure security** using [Security Guide](SECURITY.md)
4. **Run setup script**: `./scripts/setup.sh`

## 🔧 Development Workflow

1. **Validate setup**: `./scripts/validate-setup.sh`
2. **Check tokens**: `./scripts/check-tokens.sh`
3. **Start services**: `./scripts/setup.sh`
4. **View logs**: `docker-compose logs -f`

## 📝 Contributing

When adding new documentation:
- Place it in this `docs/` directory
- Update this index file
- Link from the main README if appropriate
- Follow the existing documentation style