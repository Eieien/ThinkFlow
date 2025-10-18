# Contribution Guidelines
If you are interested in contributing to the thinkflow website. Feel free to contribute

## Getting Started

### Prerequisites
Ensure you have the following installed
- Node.js
- Git
- VS Code
- React
- Tailwindcss
- React Router
- Express
- Ivan pls add

## Setup
1. Clone the Repository

```
git clone https://github.com/Eieien/ThinkFlow.git
```

2. Install dependencies

```
npm create vite@latest
npm install
npm install tailwindcss @tailwindcss/vite
```

3. Install VS Code extensions

```
Just the usual lang sa
```

4. Start Development Server
```
npm run dev
```

## Project Structure
```
Thinkflow/
├── .git/                   # GitHub workflows and templates
├── .vscode/                # VS Code settings
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other assets
│   ├── components/        # React components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── TBA/           # Still to be decided
│   ├── config/            # Configuration files and data
│   ├── pages/             # React pages (routes)
│   ├── styles/            # Global styles
├── package.json           # Project dependencies and scripts
├── README.md              # Information of the project
├── Contributing.md        # Contributing guidelines for the project
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vitest.config.ts       # Test configuration
```
## Contributing Process
### 1. Choose a Feature or an issue to work on
- Check the [Notion](https://www.notion.so/2904cb6a29788098a111e54729666575?v=2904cb6a297880d1b540000ca89089c3&source=copy_link) Page
### 2. Create a Branch
```
git checkout -b feature/feature-name
# or
git checkout -b fix/bug-name
```
### 3. Make your Change
- Please don't let me work on it cuz I want to sleep
- But do write the code clean and place some comments for us to understand
- Update us if you are done and update in the Notion tasks lists as well

### 4. Commit your Changes
```
git add . 
# use conventional commits
git commit -m "feat: "

```

### 5. Push your changes
```
git push origin feature/feature-name
```

## Code Standards
### File Naming
- Use PascalCase for components: `GuestHeader.tsx`
- use camelCase for Variables and utilities/configs: `userInfo.ts` 
- use lowercase for directories: `/pages` 