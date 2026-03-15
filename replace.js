const fs = require('fs');
let code = fs.readFileSync('components/shared/Sidebar.tsx', 'utf8');

const regex = /if \\(link\.href === \
