import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import sharpResizeImage from '../../utilities/imageProcessing';
const imagesRoutes = express.Router();
const currentdir = __dirname;

//helper function which gets the file name
const getFileName = (name: string): string => {
  try {
    const returnName = name.slice(0, name.indexOf('.'));
    return returnName;
  } catch {
    return name;
  }
};
//helper function which gets the file extension
const getFileExtension = (name: string): string => {
  try {
    const returnName = name.substring(name.indexOf('.'));
    return returnName;
  } catch {
    return '';
  }
};

imagesRoutes.get('/', async (req, res) => {
  //Read filename, width and height from query
  const imageProps = {
    filename: req.query.filename?.toString() as string,
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string),
    filenameWithoutExtension: getFileName(
      req.query.filename?.toString() as string
    ),
    fileExtension: getFileExtension(req.query.filename?.toString() as string)
  };
  const requestedPath = path.join(
    __dirname,
    '../../../assets/full',
    imageProps.filename
  );
  const requestedPathThumb = path.join(
    __dirname,
    '../../../assets/thumb',
    imageProps.filenameWithoutExtension +
      imageProps.width.toString() +
      imageProps.height.toString() +
      imageProps.fileExtension
  );

  //add: if filename is not valid, then return error message
  try {
    if ((await fs.access(requestedPath)) != undefined) {
      res.status(400).send('The requested image does not exist on the server.');
    }
  } catch {
    res.status(400).send('The requested image does not exist on the server.');
  }

  //add: if height or width are not specificed, then return the full image
  if (isNaN(imageProps.height) || isNaN(imageProps.width)) {
    res.status(200).sendFile(requestedPath);
  } else {
    //if filename is valid, and height and width are specified, check if resized image exists. if it does, send it.
    try {
      if ((await fs.access(requestedPathThumb)) == undefined) {
        //image exists
        res.status(200).sendFile(requestedPathThumb);
      }
    } catch {
      //if it does not exist, resize using sharp function stored in utilities, save to thumb and send resized image
      sharpResizeImage(
        requestedPath,
        imageProps.width,
        imageProps.height,
        requestedPathThumb
      ).then((data: any) => res.type('jpg').send(data));
    }
  }
});

export default imagesRoutes;
