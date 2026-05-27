# __dirname Jump to File

VS Code Extension ที่ช่วยให้คุณ **Ctrl+Click (Jump to File)** ได้จาก path ที่ใช้ร่วมกับ `__dirname`

## รองรับ Patterns

```javascript
// __dirname + string
__dirname + '/../../config.js'
__dirname + "../../utils/helper.ts"

// path.join
path.join(__dirname, '/../../config.js')

// path.resolve
path.resolve(__dirname, '../../config.js')
```

## วิธีใช้งาน

1. เปิดโปรเจคนี้ใน VS Code
2. กด `F5` เพื่อรัน Extension Host (debug mode)
3. เปิดไฟล์ JavaScript/TypeScript ที่มี `__dirname + '/path'`
4. **Ctrl+Click** ที่ path ได้เลย!

## วิธี Build & Package

```bash
# 1. ติดตั้ง dependencies ก่อน (สำคัญ!)
npm install

# 2. Build เป็นไฟล์ .vsix
npx vsce package
```

แล้วติดตั้งไฟล์ `.vsix` ผ่าน **Extensions > Install from VSIX**
