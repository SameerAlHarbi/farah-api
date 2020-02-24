const express = require('express');
const chalk = require('chalk');
require('./db/mongoose');
const userRouter = require('./routers/user.router');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     console.log(req.method, req.path);

//     if(req.method === 'GET') {
//         res.send('GET requests are disabled!');
//     } else {
//         next();
//     }
// });

//Site maintinance mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down, Check back soon!');
// });

app.use(express.json());
app.use(userRouter);


app.listen(port, () => {
    console.log(chalk.greenBright.inverse('Server is up and running on port ' + port));
});





