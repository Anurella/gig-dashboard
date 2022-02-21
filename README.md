# SideBoard DashBoard

// "watch-svg": "chokidar './src/\*_/_.svg' -c 'npm run svg'"
// "watch": "npm-run-all -p build watch-css watch-js watch-svg watch-img watch-copy",
"svg": "svgo -f src/svg dist/svg -r --disable=removeViewBox,removeTitle",
