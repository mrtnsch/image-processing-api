import express from 'express';
import {promises as fs} from 'fs';
import path from 'path';
import sharp from 'sharp';
const imagesRoutes = express.Router();
const currentdir = __dirname;

//helper function which gets the file name
const getFileName = (name: string) => {
    try {
        const returnName = name.slice(0,name.indexOf("."));
        return returnName;
    } catch {
        return name;
    }
}
//helper function which gets the file extension
const getFileExtension = (name: string) => {
    try {
        const returnName = name.substring(name.indexOf("."));
        return returnName;
    } catch {
        return "";
    }
}

imagesRoutes.get('/',async (req,res) => {
    //Read filename, width and height from query
    const imageProps = {
        filename:req.query.filename?.toString() as string,
        width:parseInt(req.query.width as string),
        height:parseInt(req.query.height as string),
        filenameWithoutExtension:getFileName(req.query.filename?.toString() as string),
        fileExtension:getFileExtension(req.query.filename?.toString() as string)
    }
    const requestedPath=path.join(__dirname,'../../../assets/full',imageProps.filename);
    const requestedPathThumb=path.join(
        __dirname,
        '../../../assets/thumb',(
        imageProps.filenameWithoutExtension+
        imageProps.width.toString()+
        imageProps.height.toString()+
        imageProps.fileExtension));
    
    //add: if filename is not valid, then return error message
    try {
        if (await fs.access(requestedPath) != undefined) {
            res.status(400).send("The requested image does not exist on the server.");
        }
    } catch {
        console.error(`User requested file "${imageProps.filename}" which does not exist on the server`)
        res.status(400).send("The requested image does not exist on the server.");
    }

    //add: if height or width are not specificed, then return the full image
    if (!(imageProps.height && imageProps.width)) {
        res.status(200).sendFile(requestedPath);
    }
    
    //if filename is valid, and height and width are specified, check if resized image exists. if it does, send it.
    try {
        if (await fs.access(requestedPathThumb) == undefined) {
            //image exists
            res.status(200).sendFile(requestedPathThumb);
        }
    } catch {
        //if it does not exist, resize using sharp, save to thumb and send resized image
         
            sharp(requestedPath)
            .resize(imageProps.width,imageProps.height)
            .toFile(requestedPathThumb,(err:any) => {
            })
            .toBuffer()
            .then(data => res.type('jpg').send(data))
        
            //unable to get the code working with this snippet, using above workaround
            // res.status(200).sendFile(requestedPathThumb); 
    }
    
});

export default imagesRoutes;