import sharp from 'sharp';

//contains image resizing logic using sharp
const sharpResizeImage = (
  requestedPath: string,
  width: number,
  height: number,
  requestedPathThumb: string
): Promise<{}> => {
  return sharp(requestedPath)
    .resize(width, height)
    .toFile(requestedPathThumb, (err: any) => {})
    .toBuffer();
};

export default sharpResizeImage;
