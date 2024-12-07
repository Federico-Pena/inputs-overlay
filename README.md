# inputs-overlay

A **Keyboard, Mouse and Gamepad Overlay** built with Electron and Python.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## Project Setup

### Prerequisites

- **Node.js** installed: [Node.js Official Website](https://nodejs.org/)
- **Python 3.x** installed: [Python Official Website](https://www.python.org/downloads/)
- Install `pip` (Python package installer) if not available.
- **Git** installed: [Git Official Website](https://git-scm.com/)
- **WinRar** installed: [WinRar Official Website](https://www.winrar.es/descargas). Optional, but recommended for compression and copying setup file.

---

### 1. Install Dependencies

#### Install Node.js Dependencies

```bash
$ npm install
```

#### Set Up Python Virtual Environment (Recommended)

1. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:

   - **Linux / macOS**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

### 2. Development

To start the app in development mode:

```bash
$ npm run dev
```

---

### 3. Build

Use the appropriate build command for your operating system:

- **Windows**:

  ```bash
  npm run build:win
  ```

- **macOS**:

  ```bash
  npm run build:mac
  ```

- **Linux**:
  ```bash
  npm run build:linux
  ```

---

### 4. File Structure

```
kym-overlay/
│
├── venv/                  # Virtual environment
├── src/Electron app       # Electron app source code
├── requirements.txt       # Python dependencies
├── package.json           # Node.js project file
└── ...configFiles         # Config files
```

---

### 5. .gitignore Configuration

Ensure the `venv` folder and other unnecessary files are not pushed to GitHub. The following `.gitignore` entry will help:

```
# Ignore Python virtual environment
venv/

# Ignore Python cache files
__pycache__/
*.pyc

# Ignore OS specific files
.DS_Store

# Node.js dependencies
node_modules/
```

---

### 6. Install Dependencies after Cloning

After cloning the repository, follow these steps:

1. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

2. **Set up Python virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/macOS
   # On Windows: .\venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

---

### 7. Troubleshooting

- Ensure that Python is correctly added to your system's PATH if you encounter "Python not found" errors.

---
