# Installation
```bash
npm install @orbitaloyster/mongo
```

# Usage
```
import * as mongo from "@orbitaloyster/mongo";
await mongo.connect("mongodb://user:password@dbHost/dbName");
/* Some code */
await mongo.close();
```

# License
[MIT](LICENSE)
