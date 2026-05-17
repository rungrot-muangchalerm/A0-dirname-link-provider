const path = require('path');
const fs = require('fs');

// ลอง Ctrl+Click ที่ path ข้างล่างนี้

// Pattern 1: __dirname + string
const file1 = __dirname + '/target.js';
const file2 = __dirname + "../../package.json";

// Pattern 2: path.join(__dirname, '...')
const file3 = path.join(__dirname, '/target.js');
const file4 = path.join(__dirname, "../../README.md");

// Pattern 3: path.resolve(__dirname, '...')
const file5 = path.resolve(__dirname, '../package.json');

console.log(file1, file2, file3, file4, file5);
