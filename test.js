import fs from 'fs'; const user = JSON.parse(fs.readFileSync('./kindlink_user.json', 'utf8')); console.log(user);
