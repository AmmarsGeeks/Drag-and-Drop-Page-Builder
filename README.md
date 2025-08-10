# Drag And Drop PAge Builder 

Next.js and React application for building and managing dynamic forms with a drag-and-drop interface, state management, and import/export functionality.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Technical Details](#technical-details)  
- [Installation](#installation)  
- [Folder Structure](#folder-structure)  
- [Screenshots](#screenshots)  
- [Demo](#demo)  
- [API Endpoints](#api-endpoints)  
- [License](#license)  

---

## Overview

This application provides a complete solution for creating, managing, and publishing forms. It features:

-   Drag-and-drop form builder interface

-   Real-time preview of forms

-   State management using React Context API

-   Import/export functionality for form designs

-   Form submission tracking and statistics

-   Responsive design for all device sizes

The application is built entirely frontend with no backend dependencies, making it easy to run and deploy.

---

## Features

### Form Builder
- Drag-and-drop form elements  
- Real-time preview of form designs  
- Section-based layouts (headers, footers, hero sections)  
- Element property customization  
- Form validation rules

### Form Management
- Create, edit, and delete forms  
- Publish forms with unique shareable links  
- Archive forms to prevent new submissions  
- View form statistics (visits, submissions)

### Data Handling
- Import/export form designs as JSON  
- Save form state to `localStorage`  
- Export all application data  
- Import previous state backups

### Submission System
- Form submission tracking  
- View submission details  
- Delete submissions  
- Calculate submission rates and bounce rates

---

## Technical Details
- **Framework:** Next.js 14 (App Router)  
- **Language:** TypeScript  
- **State Management:** React Context API + `useReducer`  
- **UI Library:** Shadcn UI  
- **Drag-and-Drop:** Dnd Kit  
- **Styling:** Tailwind CSS  
- **Form Validation:** Zod  
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites
- Node.js (LTS)  
- pnpm / yarn / npm (choose your preferred package manager)  
- Git


### Running the application with docker

To build and start the app container, run:
```bash
 docker-compose up --build
```

## Installation

Follow these steps to set up the application locally:


### 1.Clone the repository:

```bash
 git clone https://github.com/your-username/form-builder.git
 cd form-builder
```

### 2.Install dependencies:

```bash
 npm install
# or
yarn install
```

### 3.Start the development server:

Visit http://localhost:3000 in your browser


## Usage

### Creating a Form
1. Navigate to the **Dashboard**  
2. Click **Create Form**  
3. Enter form name and description  
4. Click **Save** to open the form builder

### Building a Form
- Drag elements from the sidebar to the canvas  
- Configure element properties in the properties panel  
- Use layout elements to organize your form (sections, columns, etc.)  
- Save your progress periodically

### Publishing a Form
- Ensure your form has at least one input field  
- Click **Publish** in the header  
- Confirm publishing in the dialog  
- Share the generated link for submissions

### Importing / Exporting
**To export a form design:**
1. Open the form in the builder  
2. Click **Export** in the header  
3. A JSON file will download

**To import a form design:**
1. Open the form in the builder  
2. Click **Import** in the header  
3. Select a valid form design JSON file

---



## Folder Structure

```bash
form-builder/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── builder/
│   │   │   │   └── [id]/            # Form builder page
│   │   │   ├── details/
│   │   │   │   └── [id]/            # Form details page
│   │   │   └── page.tsx             # Dashboard main page
│   │   ├── submit/
│   │   │   └── [shareId]/           # Form submission page
│   │   └── layout.tsx               # Main layout
│   ├── components/
│   │   ├── dashboard/               # Dashboard components
│   │   ├── form-builder/            # Form builder components
│   │   ├── form-details/            # Form details components
│   │   ├── form-preview/            # Form preview components
│   │   ├── submit/                  # Form submission components
│   │   └── ui/                      # UI components
│   ├── context/
│   │   └── form-context.tsx         # State management context
│   ├── hooks/
│   │   ├── use-designer.ts          # Designer hook
│   │   └── use-form-builder-sensors.ts # Drag-and-drop sensors
│   ├── lib/
│   │   └── json-validator.ts        # JSON validation utilities
│   ├── types/
│   │   ├── form-builder.ts          # Form builder types
│   │   └── types.ts                 # Application types
│   └── styles/
│       └── globals.css              # Global styles
├── public/                          # Static assets
├── package.json
├── tailwind.config.js
└── README.md
```


## Screenshots

#### Dashboard View

![Dashboard](https://i.ibb.co/mnswM86/Screenshot-1447-02-16-at-3-35-14-AM.png)

Overview of all forms with statistics



#### Form Builder

![Form Builder](https://i.ibb.co/x88t2LBZ/Screenshot-1447-02-16-at-3-36-09-AM.png)

Drag-and-drop interface for creating forms


#### Preview

![image](https://i.ibb.co/VW2VpnZc/Screenshot-1447-02-16-at-3-37-06-AM.png)

Detailed view of form submissions and statistics


#### Published Form

![image](https://i.ibb.co/JF26Y6M7/Screenshot-1447-02-16-at-3-38-22-AM.png)
Form preview in published state




## Demo

Check out the live demo of the form builder:  
[https://jumpshare.com/s/D0t7ZDh04H2XfnaKKLlr](https://jumpshare.com/s/D0t7ZDh04H2XfnaKKLlr)

The demo shows:

- Creating a new form  
- Adding form elements using drag-and-drop  
- Configuring element properties  
- Publishing a form  
- Submitting to a published form  
- Viewing submission data  
- Importing/exporting form designs

---



## License
    This project is licensed under the MIT License

