const fs = require('fs');
const filePath = 'node_modules/next/dist/compiled/@vercel/og/index.node.js';

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replaceAll('../noto-sans-v27-latin-regular.ttf', './noto-sans-v27-latin-regular.ttf');
  content = content.replaceAll('../yoga.wasm', './yoga.wasm');
  content = content.replaceAll('../resvg.wasm', './resvg.wasm');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Successfully updated relative paths to ./ in @vercel/og!');
} else {
  console.log('Path not found:', filePath);
}
