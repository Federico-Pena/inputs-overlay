# kym-overlay

A **Keyboard and Mouse Overlay** built with Electron and Python.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## Project Setup

### Prerequisites

- **Node.js** installed: [Node.js Official Website](https://nodejs.org/)
- **Python 3.x** installed: [Python Official Website](https://www.python.org/downloads/)
- Install `pip` (Python package installer) if not available.
- **Git** installed: [Git Official Website](https://git-scm.com/)

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

### 4. Python Script Usage

The app relies on a Python script to track keyboard and mouse events. Make sure the virtual environment is active before running any Python code.

To start listening for events manually (for testing purposes):

```bash
python path/to/your_script.py
```

---

### 5. File Structure

```
kym-overlay/
│
├── venv/                  # Virtual environment (ignored in .gitignore)
├── src/                   # Source code of the Electron app
├── python/                # Python scripts and logic
├── requirements.txt       # Python dependencies
├── package.json           # Node.js project file
├── .gitignore             # Files to ignore in Git
└── README.md              # Project documentation
```

---

### 6. .gitignore Configuration

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

### 7. Install Dependencies after Cloning

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

### 8. Troubleshooting

- If the Python module `pynput` is missing, make sure to run:
  ```bash
  pip install pynput
  ```
- Ensure that Python is correctly added to your system's PATH if you encounter "Python not found" errors.
- If Node.js commands fail, verify that Node.js and npm are properly installed.

---
