import request from 'supertest';
import app from '../../src';

describe('POST /command', () => {
    afterEach(done => {
        app.close(done);
    });
    test('should respond to the post method', async done => {
        const response = await request(app).post('/command');
        expect(response.status).toEqual(200);
        done();
    });
});
