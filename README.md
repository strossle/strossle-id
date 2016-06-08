# Strossle-id

Unique Strossle ID generator

# Syntax
Strossle ID is composed of **38** hexadecimal characters: 

**`VVVVRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRCC`**

- First 4 characters `VVVV` represent the version of the ID
- Next are 32 `RRR...RRR` random characters
- The ID is concluded with 2 checksum `CC` characters

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

| Version     | Description                 | State     |
| ----------- | --------------------------- | --------- |
| 1 (current) | Using [metrohash128](https://github.com/robertklep/node-metrohash) and [crc8](https://github.com/alexgorbatchev/node-crc) | Supported |

**Note:** If an unsupported version is provided as parameter to `generate()` function, the function defaults to current version.

# Tests
Run `mocha test/unit-test.js`
