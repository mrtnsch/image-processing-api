import sharp from 'sharp';

//contains image resizing logic using sharp
const sharpResizeImage = (
  requestedPath: string,
  width: number,
  height: number,
  requestedPathThumb: string
): Promise<Buffer> => {
  return sharp(requestedPath)
    .resize(width, height)
    .toFile(requestedPathThumb, (err: Error): void => {
      if (err) console.error(err);
    })
    .toBuffer();
};

export default sharpResizeImage;
