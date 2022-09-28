const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

app.use(express.json());

// const whitelist = ['http://localhost:8080', 'http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000/api/v1/products', 'http://localhost:3000', 'https://peaceful-anchorage-46846.herokuapp.com' ];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else{
//       callback(new Error('No permitido'))
//     }
//   }
// }
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
