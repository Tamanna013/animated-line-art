# 🌊 Infinite Glowing Wave Animation in Three.js

## 📌 Overview
This project creates an infinite animated wave effect using Three.js. The waves are made of glowing, animated lines that flow continuously, creating a futuristic aesthetic.

## 📷 Preview
![Image](Screenshot%202025-02-19%20155237.png)

---

## 🛠️ Setup & Installation
### 1️⃣ Prerequisites
Make sure you have Node.js installed.

### 2️⃣ Install Dependencies
```bash
npm install three
```

### 3️⃣ Run the Project
Save the JavaScript file and include it in an HTML file with a basic setup:<br>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Glowing Waves</title>
    <style>body { margin: 0; overflow: hidden; }</style>
</head>
<body>
    <script type="module" src="your-script.js"></script>
</body>
</html>
```

Then, run a local server to view it:<br>
```bash
npx http-server
```

---

## 🏗️ Technologies Used
- [Three.js](https://threejs.org/) - 3D rendering<br>
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) - Smooth camera movement<br>
- [EffectComposer & UnrealBloomPass](https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass) - Post-processing glow<br>

---

## 🖥️ How It Works
1. Creates multiple animated wave-like lines using `TubeGeometry`.<br>
2. Applies an emissive glow effect using `MeshStandardMaterial` and `UnrealBloomPass`.<br>
3. Animates the lines dynamically to create an infinite movement effect.<br>
4. User can rotate & zoom using `OrbitControls`.<br>

---

## ⚡ Customization
### 🎨 Change Colors
Modify the `colors` array to use different shades:<br>
```js
const colors = [0xff0000, 0x00ff00, 0x0000ff]; // Red, Green, Blue
```

### 💡 Adjust Glow Strength
Modify the bloom effect:<br>
```js
bloomPass.strength = 2.5; // Increase for a stronger glow
bloomPass.radius = 0.5;
```

### 🌀 Change Wave Shape
Modify the sine and cosine values:<br>
```js
let y = Math.sin(x * 2.0) * 3;  // Higher values = bigger waves
let z = Math.cos(x * 1.5) * 2;
```
