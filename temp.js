const fs = require('fs');
const files = ['app/(auth)/login/page.tsx', 'app/(auth)/register/page.tsx', 'app/spa/routes/form.tsx'];
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\{field\.state\.meta\.errors\.map\(\(err: any\) => typeof err === 'string' \? err : err\?\.message \|\| 'Invalid value'\)\.join\(\', \'\)\}\}\}/g, \"{field.state.meta.errors.map((err: any) => typeof err === 'string' ? err : err?.message || 'Invalid value').join(', ')}\");
    fs.writeFileSync(f, content);
});
