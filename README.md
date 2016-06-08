# Strossle-id

Unique Strossle ID generator

# Installation
Install by running `npm install strossle-id`

# Usage
```javascript
const strossle-id = require('strossle-id');

// Generate a new random id
let newID = strossle-id.generate();

// Validate id
strossle-id.validate(newID); // true

// OPTIONAL - generate a specific version of strossle-ID
let idVersion = 1;
let earlyVersionID = strossle-id.generate(idVersion);
```

# ID Versions
Table lists all strossle-id versions, their details and state.
| Version | Description                 | State     |
| ------- | --------------------------- | --------- |
| 1       | Using [metrohash128](https://github.com/robertklep/node-metrohash) and [crc8](https://github.com/alexgorbatchev/node-crc) | Supported |

