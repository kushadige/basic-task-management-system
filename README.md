# Project Documentation

This project is a React-based web application focused on task management, featuring a task board with customizable tasks. The application is structured to support development with a modern JavaScript stack, including TypeScript for type safety, React for UI components, and Webpack for bundling. Below is a comprehensive documentation of the key parts of this project.

## Built With

[![TypeScript][TypeScript]][TypeScript-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![Webpack][Webpack]][Webpack-url]
[![npm][npm]][Npm-url]

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A package manager such as npm, yarn, pnpm, or bun.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running one of the following commands based on your package manager:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:8080 with your browser to see the result. The page auto-updates as you edit the files.

## Task Management Features

### Creating a Task

To create a task, follow these steps:

1. Click the "Create Task" button in the header.
2. Fill in the task details in the form.

<div align="center">
  <img src="https://github.com/user-attachments/assets/5b3ea83b-f628-47fe-9904-b5cbde0e11bf" alt="Creating a task" />
</div>

### Deleting a Task

To delete a task, follow these steps:

1. Grab the task you want to delete.
2. Move it to the trash icon that appears when you grab the task.

<div align="center">
  <img src="https://github.com/user-attachments/assets/a85ac78f-61e6-4aa7-9f36-0f0a2ea84230" alt="Deleting a task" />
</div>

### Moving a Task

To move a task to a different column, follow these steps:

1. Grab the task you want to move.
2. Drag it to the desired column.

<div align="center">
  <img src="https://github.com/user-attachments/assets/aecc9404-b79d-4ba5-a857-9ac3f154dda3" alt="Moving a task" />
</div>

### Editing a Task

To edit a task, follow these steps:

1. Click the edit icon represented by a pencil on the task card.
2. Modify the task details in the form.

<div align="center">
  <img src="https://github.com/user-attachments/assets/30a72fc9-3449-4602-af5d-9ec02a780f20" alt="Editing a task" />
</div>

### Importing Tasks

To import tasks from a JSON file, follow these steps:

1. Click the "JSON Input" button in the header.
2. Paste the JSON data into the input field.

<div align="center">
  <img src="https://github.com/user-attachments/assets/834189db-95cd-4b69-970b-b36a52793771" alt="Importing tasks" />
</div>

### Reordering Columns

To reorder columns, follow these steps:

1. Grab the grid icon on the column header.
2. Drag it to the drop zone that appears when you move the column.

<div align="center">
  <img src="https://github.com/user-attachments/assets/4ccce3a9-4294-43d3-95e4-934500602355" alt="Reordering columns" />
</div>

## Workspace Structure

- **bundler/**: Contains Webpack configuration files for different environments.
  - `webpack.common.js`: Common Webpack configurations.
  - `webpack.dev.js`: Development-specific Webpack configurations.
  - `webpack.prod.js`: Production-specific Webpack configurations.
- **public/**: Contains static files like index.html.
- **index.tsx**: Entry point for the React application.
- **index.css**: Global CSS styles.
- **src/**: Source code directory.
  - `App.tsx`: The main React component that bootstraps the application.
  - **components/**: UI components organized by functionality.
    - **layout/**: Components that define the layout of the application, like header.tsx.
    - **task-board/**: Components for the task board feature, including board.tsx, card.tsx, column.tsx, and task-form.tsx.
    - **ui/**: Reusable UI components, including button.tsx and json-input.tsx.
  - **data/**: Contains static data, like dummy.json.
  - **hooks/**: Custom React hooks, including useBoardState.ts, useLocalStorage.ts, and useTaskStore.ts.
  - **lib/**: Library code, such as tw.ts for Tailwind CSS integration.
  - **utils/**: Utility functions and types, including constants.ts, schemas.ts, and types.ts.
- **tailwind.config.ts**: Configuration for Tailwind CSS.
- **tsconfig.json**: Configuration for TypeScript.
- **components.json**: Likely contains metadata or configuration for UI components.
- **package.json**: Manages project dependencies and scripts.
- **postcss.config.js**: Configuration for PostCSS, a tool for transforming CSS with JavaScript.
- **.gitignore**: Specifies intentionally untracked files to ignore.

## Key Components

### JSONInput

Located in `src/components/ui/json-input.tsx`, this component allows users to input JSON data. It uses the Monaco Editor for a rich text editing experience. The component handles parsing and validation errors, displaying them to the user.

### Header

Found in `src/components/layout/header.tsx`, the Header component serves as the application's top navigation bar. It provides access to creating tasks through a form and inputting tasks via JSON data. It integrates with the `useTaskStore` hook for state management and `tasksSchema` for data validation.

## Development Tools

- **Webpack**: Used for bundling the application. The development configuration in `bundler/webpack.dev.js` includes settings for hot module replacement, compression, and a development server.
- **Tailwind CSS**: For styling, configured in `tailwind.config.ts`.
- **TypeScript**: Provides type safety across the application, configured in `tsconfig.json`.
- **React**: Used for building the UI components.
- **PostCSS**: Processes CSS with JavaScript, configured in `postcss.config.js`.

## Scripts

Defined in `package.json`, these scripts are used for development and production:

- `dev`: Start the development server.
- `build`: Build the application for production.
- `start`: Start the production server.

## Deployment

The application is deployed to Vercel using the GitHub repository.

## Dependencies

- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [typescript](https://www.npmjs.com/package/typescript)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [zustand](https://www.npmjs.com/package/zustand)
- [shadcn-ui](https://www.npmjs.com/package/shadcn-ui)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [yup](https://www.npmjs.com/package/yup)
- [uuid](https://www.npmjs.com/package/uuid)
- [lucide-react](https://www.npmjs.com/package/lucide-react)

## Contact

- Oğuzhan Kuşlar - [@kushadige](https://github.com/kushadige) - oguzhankuslar@gmail.com

[Webpack]: https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black
[Webpack-url]: https://webpack.js.org/
[Npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[Npm-url]: https://www.npmjs.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
