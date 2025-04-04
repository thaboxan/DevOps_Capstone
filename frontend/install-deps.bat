@echo off
echo Installing dependencies...

:: Install core dependencies
call npm install react react-dom react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled axios date-fns

:: Install TypeScript and type definitions
call npm install --save-dev typescript @types/react @types/react-dom @types/node @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest

:: Install additional development dependencies
call npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks

echo Dependencies installed successfully!
