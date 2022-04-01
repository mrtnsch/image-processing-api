import express from 'express';
import routes from './routes/index';
// import sharp from 'sharp';

const app = express();
const port = 3000;

//use the routes defined in the routes folder
app.use('/api', routes);

//image processing logic can be found in routes/api/imagesRoute

//start the server
app.listen(port, ():void => {
  console.log(`Server started and listening at port ${port}`);
});

//export app object for testing
export default app;
