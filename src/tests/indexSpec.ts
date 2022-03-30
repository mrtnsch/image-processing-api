import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('checks if the response is an image when request comes with correct parameters', async () => {
    const response = await request.get(
      '/api/images/?filename=encenadaport.jpg&width=200&height=200'
    );
    expect(response.type).toBe('image/jpeg');
  });

  // //old tests used during development when sending different responses
  // it('checks if filename, height and width are read correctly when supplied correctly', async () => {
  //     const response = await request.get('/api/images/?filename=testfilename&width=200&height=200');
  //     expect(response.body.filename).toBe("testfilename");
  //     expect(response.body.width).toBe(200);
  //     expect(response.body.height).toBe(200);
  // })
  // it('checks if user input is handled correctly if text is supplied as height and width', async () => {
  //     const response = await request.get('/api/images/?filename=123&width=abc&height=abc');
  //     expect(response.body.filename).toBe("123");
  //     expect(response.body.width).toBe(null);
  //     expect(response.body.height).toBe(null);
  // })
});
