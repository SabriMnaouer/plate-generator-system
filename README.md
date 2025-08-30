
# Plate Generator System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Technologies](https://img.shields.io/badge/React-TypeScript-blueviolet)

## Introduction

The **Plate Generator System** is an advanced web application meticulously engineered to provide users with a powerful and intuitive platform for configuring and visualizing custom wall plates. Developed with cutting-edge **React 19** and **TypeScript**, this application stands as a testament to modern web development, offering dynamic plate management, real-time dimensional input, and sophisticated image rendering capabilities, including an innovative mirroring function for expansive configurations. Its design prioritizes a fluid and responsive user experience across all devices, from high-resolution desktops to mobile handsets, underpinned by a foundation of exceptional performance, robust type safety, and effortless maintainability.

This project is a comprehensive showcase of best-in-class software engineering practices, illustrating a professional paradigm for application architecture, state management, rigorous input validation, and adaptive responsive design. It serves as an invaluable resource for developers aspiring to master the complexities of building high-quality, interactive React applications, with a strong emphasis on leveraging TypeScript to achieve unparalleled code reliability and an optimized developer workflow.


## Screenshots

-   **Desktop View**: A full-screen view of the application on a desktop, showcasing the dual-panel layout.
    ![Desktop View](src/desktop-view.png)

-   **Mobile View**: A view of the application on a mobile device, demonstrating the stacked layout and touch-friendly interface.
    ![Mobile View](src/mobile-view.png)


-   **Validation Feedback**: A screenshot showing an input field with an active validation error message.
    ![Validation Feedback](src/validation-error.png)

## Key Features

-   **Dynamic Plate Configuration**: Seamlessly add, remove, and modify plate specifications with immediate visual feedback.
-   **Precision Dimensioning**: Input plate width (20-300cm) and height (30-128cm) with real-time updates to the visual representation.
-   **Internationalized Numeric Input**: Intelligent parsing supports both decimal points and commas, accommodating diverse regional input conventions.
-   **High-Fidelity Canvas Rendering**: Utilizes the HTML5 Canvas API for crisp, pixel-perfect visualization of plates, adorned with an elegant botanical motif.
-   **Adaptive Image Mirroring**: An intelligent algorithm automatically mirrors the motif image for configurations exceeding 300cm in total width, ensuring visual continuity and aesthetic integrity.
-   **Persistent User Sessions**: All user configurations are automatically saved to and loaded from `localStorage`, guaranteeing data preservation across browser sessions.
-   **Robust Input Validation**: A comprehensive validation system provides instant, non-disruptive feedback and clear, actionable error messages.
-   **Fluid Responsive Design**: Engineered with a mobile-first philosophy, delivering an optimized and consistent user experience across all screen sizes and device types.
-   **Performance Excellence**: Incorporates advanced optimization strategies for rendering efficiency, memory management, and overall application responsiveness, ensuring a smooth and lag-free interaction.
-   **Uncompromising Type Safety**: Developed entirely in TypeScript, enabling compile-time error detection, superior IDE support, and significantly enhanced code quality and predictability.

## Technology Stack

This project leverages a modern and robust technology stack to deliver a high-performance and maintainable application:

-   **Frontend Framework**: React 19.1.0
-   **Programming Language**: TypeScript 5.9.2
-   **Build Tool**: Vite 6.3.5 (for lightning-fast development and optimized builds)
-   **Package Manager**: pnpm (for efficient dependency management)
-   **Styling Framework**: Tailwind CSS 4.1.7 (for utility-first, highly customizable styling)
-   **UI Component Library**: shadcn/ui (for accessible and beautifully designed UI components)
-   **Iconography**: Lucide React (for a consistent and extensive set of SVG icons)
-   **Code Quality**: ESLint (for enforcing coding standards and identifying issues)

## Project Architecture & Structure

The `plate-generator-system` project adheres to a clean, modular, and scalable architecture, promoting maintainability and collaboration. The directory structure is intuitively organized to separate concerns and facilitate rapid development:

```
plate-generator-system/
├── public/                     # Static assets served directly by the web server (e.g., favicon)
├── src/                        # Core application source code
│   ├── assets/                 # Static assets like images (e.g., motif-image.jpg)
│   ├── components/             # Reusable React components, categorized by their function
│   │   ├── CanvasDisplay/      # Encapsulates the HTML5 Canvas rendering logic
│   │   ├── PlateInput/         # Handles user input for plate dimensions and properties
│   │   ├── PlateList/          # Manages the display and interaction with multiple plates
│   │   └── ui/                 # Contains the auto-generated and customized shadcn/ui components
│   ├── hooks/                  # Custom React Hooks for encapsulating reusable logic (e.g., use-mobile.ts for device detection)
│   ├── lib/                    # General utility functions and configurations (e.g., utils.ts)
│   ├── types/                  # Centralized TypeScript type and interface definitions for the application's data models
│   ├── utils/                  # Specific utility functions, often related to business logic (e.g., validation, number parsing)
│   ├── App.tsx                 # The root component of the React application, orchestrating global state and layout
│   ├── App.css                 # Application-wide CSS styles, often imported into App.tsx
│   ├── index.css               # Global CSS styles, including Tailwind CSS base styles and directives
│   └── main.tsx                # The main entry point for the React application, responsible for rendering the App component
├── components.json             # Configuration file for shadcn/ui, defining component paths and styles
├── eslint.config.js            # ESLint configuration for code linting and style enforcement
├── index.html                  # The main HTML template file that serves the React application
├── package.json                # Project metadata, scripts, and dependency declarations
├── pnpm-lock.yaml              # pnpm lock file, ensuring consistent dependency installations across environments
├── tsconfig.json               # Primary TypeScript configuration for the client-side application
├── tsconfig.node.json          # TypeScript configuration specifically for Node.js-based tools (e.g., Vite, ESLint)
└── vite.config.js              # Vite bundler configuration, defining build processes and development server settings
```

This meticulously structured approach ensures clear separation of concerns, enhances code readability, simplifies debugging, and significantly boosts the project's scalability and maintainability. Each module serves a distinct purpose, contributing to a robust and understandable codebase.

## Getting Started

Follow these instructions to set up and run the project locally for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your system:

-   **Node.js**: Version 18 or higher (LTS recommended). Download it from [nodejs.org](https://nodejs.org/).
-   **npm** (comes with Node.js) or **pnpm** / **yarn**: A package manager to install dependencies.
-   **VS Code** (recommended): For editing and running the project efficiently.
-   **Git**: To clone the repository and manage version control. Download it from [git-scm.com](https://git-scm.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SabriMnaouer/plate-generator-system.git
    cd plate-generator-system
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

### Running the Application

#### Development Mode

To start the development server with hot module replacement:

```bash
npm run dev
```

This command will typically make the application accessible at `http://localhost:5173`.

#### Production Build

To compile and optimize the application for production deployment:

```bash
npm run build
```

The optimized static files will be generated in the `dist/` directory.

#### Preview Production Build

To locally preview the production-ready build:

```bash
npm run preview
```

## Usage & Interaction

### Plate Management

-   **Adding Plates**: Click the **"Add Plate"** button to introduce new plates into your configuration. The system supports up to a maximum of 10 plates.
-   **Default Dimensions**: Each newly added plate initializes with default dimensions of 250cm in width and 128cm in height.
-   **Removing Plates**: Utilize the trash icon associated with each plate to remove it from the configuration. A minimum of 1 plate is always required.

### Configuring Dimensions

-   **Width Input**: Enter values ranging from 20cm to 300cm.
-   **Height Input**: Enter values ranging from 30cm to 128cm.
-   **Flexible Numeric Input**: The system intelligently handles both decimal points (`.`) and commas (`,`) as decimal separators, providing a user-friendly experience across different locales.
-   **Real-time Validation**: Invalid inputs trigger immediate visual feedback and clear error messages. The system intelligently reverts to the last valid value to prevent data loss.
-   **Instant Visual Updates**: The canvas rendering updates in real-time as you adjust dimensions, providing immediate visual confirmation of your changes.

### Advanced Image Mirroring

One of the standout features of this system is its sophisticated image mirroring capability. When the cumulative width of all configured plates exceeds 300cm, the botanical motif image is automatically mirrored horizontally. This ensures a seamless and aesthetically pleasing visual continuity across the entire composite plate, even for very wide configurations where plates span both original and mirrored sections of the motif.

### Responsive Experience

The application is designed to provide an optimal user experience across a spectrum of devices:

-   **Desktop Layout**: Features a side-by-side layout, with the interactive canvas display prominently positioned on the left and the configuration controls neatly organized on the right.
-   **Mobile Layout**: Adapts to a stacked layout, placing the canvas above the controls, ensuring ease of use on smaller screens.
-   **Touch Optimization**: Interactive elements are designed with larger touch targets and improved spacing, enhancing usability on touch-enabled devices.


## Contributing

We welcome contributions to enhance the Plate Generator System! To contribute, please follow these guidelines:

1.  **Fork the Repository**: Start by forking the project to your GitHub account.
2.  **Create a Feature Branch**: Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Implement Your Changes**: Write your code, ensuring it adheres to the project's coding standards and includes comprehensive tests.
4.  **Commit Your Changes**: Commit your changes with a clear and descriptive commit message following Conventional Commits guidelines (e.g., `feat: add new feature`, `fix: resolve bug in module`).
5.  **Push to Your Branch**: Push your changes to your forked repository: `git push origin feature/your-feature-name`.
6.  **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository, detailing your changes and their benefits.
