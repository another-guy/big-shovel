# big-shovel

## Hotel Setup

```sh
npm install -g hotel

hotel add 'json-server -p 3001 logs-fake-db.json' -p 3001 -n big-shovel-fake-db -o big-shovel-fake-db.log
hotel add 'ng serve' -p 4200 -n big-shovel-spa -o big-shovel.log
```