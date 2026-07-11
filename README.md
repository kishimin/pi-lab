<div id="top"></div>

## Tech Stack

<!-- Select and keep only the badges used in your project. -->
<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Vite-646CFF.svg?logo=vite&style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/-React-20232A.svg?logo=react&style=for-the-badge&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=for-the-badge&logoColor=white">
</p>

## Table of Contents

1. [Project Name](#project-name)
2. [About the Project](#about-the-project)
3. [Environment](#environment)
4. [Directory Structure](#directory-structure)
5. [Getting Started](#getting-started)
6. [Available Commands](#available-commands)
7. [Troubleshooting](#troubleshooting)

## Project Name

<!-- Enter the project name. -->

PiLoop

## About the Project

<!-- Describe the purpose and overview of the project. -->

PiLoop is a collection of playful and slightly unusual web experiences inspired by π.

By combining mathematics with everyday communication, the project aims to create experiences that may not be particularly useful, but are fun enough to make you want to share them with someone.

This project includes the following three experiences:

- Pi Message
- Pi Receipt
- Pi Approximation Atlas

<!-- Add links to specifications, Wiki pages, or project documents if necessary. -->

<p align="left">
  <a href="[PROJECT_DOCUMENT_URL]"><strong>Project Documentation »</strong></a>
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

## Environment

<!-- Update the versions to match the project. -->

| Language / Framework | Version   |
| -------------------- | --------- |
| Node.js              | [VERSION] |
| React                | [VERSION] |
| Vite                 | [VERSION] |
| TypeScript           | [VERSION] |

See `package.json` for other package versions.

<p align="right">(<a href="#top">back to top</a>)</p>

## Directory Structure

<!-- Update the tree to match the actual project structure. -->

```text
.
├── .github
│   └── workflows
├── public
├── src
│   ├── app
│   ├── assets
│   ├── components
│   ├── features
│   ├── hooks
│   ├── pages
│   ├── routes
│   ├── styles
│   ├── types
│   ├── utils
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Main Directories

| Directory        | Description                    |
| ---------------- | ------------------------------ |
| `src/app`        | Application-wide configuration |
| `src/assets`     | Images and static assets       |
| `src/components` | Shared UI components           |
| `src/features`   | Feature-based modules          |
| `src/hooks`      | Shared custom hooks            |
| `src/pages`      | Page components                |
| `src/routes`     | Routing configuration          |
| `src/styles`     | Global styles                  |
| `src/types`      | Shared TypeScript types        |
| `src/utils`      | Shared utility functions       |

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

Install the Node.js version required by this project.

You can use a version manager such as `nvm`, `fnm`, or `Volta`.

### Clone the Repository

```bash
git clone [REPOSITORY_URL]
cd [PROJECT_DIRECTORY]
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the URL displayed in the terminal.

The default Vite development URL is usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build is generated in the `dist` directory.

### Preview the Production Build

```bash
npm run preview
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Available Commands

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Start the development server                    |
| `npm run build`   | Run type checking and create a production build |
| `npm run preview` | Preview the production build locally            |
| `npm run lint`    | Run ESLint                                      |

<!-- Add these commands when testing tools are configured. -->

| Command                 | Description             |
| ----------------------- | ----------------------- |
| `npm run test`          | Run tests               |
| `npm run test:coverage` | Run tests with coverage |

<p align="right">(<a href="#top">back to top</a>)</p>

## Troubleshooting

### `npm install` fails

Check the installed Node.js version.

```bash
node --version
```

Make sure it matches the version required by the project.

### The development port is already in use

Another process may be using Vite's default port.

Check the URL displayed in the terminal. Vite may automatically start the development server on another available port.

### `Module not found` or dependency errors

Reinstall the dependencies.

```bash
rm -rf node_modules
npm install
```

If the issue persists, remove the lock file and reinstall the dependencies.

```bash
rm -rf node_modules package-lock.json
npm install
```

### The production build fails with TypeScript errors

Run the build command and review the reported type errors.

```bash
npm run build
```

Fix the type errors and run the build again.

### The browser does not reflect recent changes

Restart the development server.

```bash
npm run dev
```

<p align="right">(<a href="#top">back to top</a>)</p>
