# Installation
```bash
npm install github:orbitaloyster/mongo
```

# Usage
```ts
import * as mongo from "@orbitaloyster/mongo";
await mongo.connect("mongodb://user:password@dbHost/dbName");
/* Some code */
await mongo.close();
```

# License
[MIT](LICENSE)
