import request from 'supertest';
import app from '../../src';

describe('POST /command', () => {
    afterEach(done => {
        app.close(done);
    });
});
