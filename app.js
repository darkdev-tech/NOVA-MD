const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('NOVA-MD is alive! Powered by Cool Kid Tech'));
require('./index'); // this starts your bot

app.listen(port, () => {
  console.log(`NOVA-MD Web Server running on port ${port}`);
});
