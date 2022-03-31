import express from 'express';
import imagesRoutes from './api/imagesRoute';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('main api route');
});

routes.use('/images', imagesRoutes);

export default routes;
