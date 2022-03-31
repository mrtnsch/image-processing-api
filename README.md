### Image Processing API
Project submission for Udacity Fullstack Javascript course.

Simple image processing api for requesting resized images that are stores on the server with a caching feature. Sharp is used for image processing.

### Usage

There is only one relevant endpoint: /api/images
Examples
?filename=<filenameHere> // returns the image in original size
?filename=<filenameHere>&width=200&height=200 // resizes the requested image and sends  it to client
