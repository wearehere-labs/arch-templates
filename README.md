# Architecture Templates

A centralized repository for managing architectural templates for mpenny.ai tool across different project types.

## Overview

This repository maintains a curated list of architectural templates for various project types. Each architecture template includes information about its type, name, repository location, and contact information.

## Structure

The repository contains a single JSON file (`arch-templates.json`) that stores all architecture templates with the following schema:

```json
{
  "architectures": [
    {
      "type": "project-type",
      "name": "Architecture Name",
      "gitRepo": "https://github.com/org/repo",
      "contactEmail": "contact@example.com"
    }
  ]
}
```

### Fields

- **type**: The category or type of architecture (e.g., `web-application`, `microservices`, `mobile-app`)
- **name**: A descriptive name for the architecture template
- **gitRepo**: URL to the Git repository containing the template
- **contactEmail**: Contact email for questions or issues related to this architecture

## Usage

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Adding a New Architecture

To add a new architecture template:

```bash
pnpm add-arch
```

You'll be prompted to enter:
- Architecture type
- Architecture name
- Git repository URL
- Contact email

### Removing an Architecture

To remove an existing architecture template:

```bash
pnpm remove-arch
```

You'll be prompted to select which architecture to remove from the list.

### Viewing All Architectures

Simply view the `arch-templates.json` file or use:

```bash
cat arch-templates.json
```

## Contributing

To contribute a new architecture template:

1. Fork this repository
2. Add your architecture using `pnpm add-arch`
3. Commit your changes
4. Submit a pull request

## License

MIT
