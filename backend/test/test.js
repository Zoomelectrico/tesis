/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:8080/api');

const INFO = {
  ID: '5cdc3250969ab06a2614247a',
  TEST_ID: '5ceabbfd83f7065cac8297da',
  TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGMzMjUwOTY5YWIwNmEyNjE0MjQ3YSIsImlhdCI6MTU1ODgwMDEyNH0.tnIEv8ZT7IrHVauNA2ER0pWEA6q02Ip8bHzh5BBD8ZI',
};

describe('API Rest Testing', () => {
  describe('Login endpoint', () => {
    it('Login', done => {
      server
        .post('/login')
        .send({
          email: 'jose.quevedo@correo.unimet.edu.ve',
          password: '12345678',
        })
        .set('Content-Type', 'application/json')
        .expect(200)
        .then(res => {
          const { success, token, user } = JSON.parse(res.text);
          success.should.be.equal(true);
          token.should.be.an.instanceOf(String);
          token
            .split('.')
            .should.be.an.instanceOf(Array)
            .and.have.lengthOf(3);
          user.should.have.property('firstName');
          user.should.have.property('lastName');
          user.should.have.property('email');
          user.should.have.property('_id');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
    it('Wrong Password or Email', done => {
      server
        .post('/login')
        .send({
          email: 'jose.quevedo@correo.unimet.edu.ve',
          password: '123456789',
        })
        .set('Content-Type', 'application/json')
        .expect(200)
        .then(res => {
          const { success } = JSON.parse(res.text);
          success.should.be.equal(false);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
  describe('Profile endpoint', () => {
    it('Not get Profile', done => {
      server
        .get(`/profile/${INFO.ID}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          done();
        });
    });
    it('Get Profile', done => {
      server
        .get(`/profile/${INFO.ID}`)
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, user } = JSON.parse(res.text);
          success.should.be.equal(true);
          user.should.have.property('firstName');
          user.should.have.property('lastName');
          user.should.have.property('email');
          user.should.have.property('_id');
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('Electoral Group Endpoints', () => {
    it('Create Electoral Group', done => {
      server
        .post(`/create-electoral-group/${INFO.TEST_ID}`)
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({
          denomination: '__test__',
          number: 1,
          colorName: '__test__',
          colorHex: '__test__',
          logo: '__test__',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, electoralGroup } = JSON.parse(res.text);
          success.should.be.equal(true);
          electoralGroup.should.have.property('denomination');
          electoralGroup.should.have.property('number');
          electoralGroup.should.have.property('color');
          electoralGroup.should.have.property('colorHex');
          electoralGroup.should.have.property('logo');
          electoralGroup.should.have.property('representative');
          done();
        })
        .catch(err => done(err));
    });
    it('Get an Electoral Group', done => {
      server
        .get(`/electoral-group/${INFO.TEST_ID}`)
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, electoralGroup } = JSON.parse(res.text);
          success.should.be.equal(true);
          electoralGroup.should.have.property('denomination');
          electoralGroup.should.have.property('number');
          electoralGroup.should.have.property('color');
          electoralGroup.should.have.property('colorHex');
          electoralGroup.should.have.property('logo');
          electoralGroup.should.have.property('representative');
          electoralGroup.should.have.property('_id');
          done();
        })
        .catch(err => done(err));
    });
    it('Get all Electoral Group', done => {
      server
        .get('/electoral-groups')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, electoralGroups } = JSON.parse(res.text);
          success.should.be.equal(true);
          electoralGroups.should.be.instanceOf(Array);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('Demands endpoints', () => {
    it('Create a Demand', done => {
      server
        .post('/demand-create')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({
          type: 'QUEJA',
          user: INFO.TEST_ID,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, demand } = JSON.parse(res.text);
          success.should.be.equal(true);
          demand.should.have.property('_id');
          demand.should.have.property('type');
          demand.should.have.property('user');
          done();
        })
        .catch(err => done(err));
    });
    it('Get all Demands', done => {
      server
        .get('/demands')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, demands } = JSON.parse(res.text);
          success.should.be.equal(true);
          demands.should.have
            .property('representative')
            .and.be.instanceOf(Array);
          demands.should.have.property('group').and.be.instanceOf(Array);
          demands.should.have.property('postulation').and.be.instanceOf(Array);
          demands.should.have.property('complain').and.be.instanceOf(Array);
          done();
        })
        .catch(err => done(err));
    });
    it('Fail at creation', done => {
      server
        .post('/demand-create')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({
          type: 'QUEJAAAAAAAAA',
          user: INFO.TEST_ID,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, err } = JSON.parse(res.text);
          success.should.be.equal(false);
          err.should.be.instanceOf(String);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('Postulations endpoints', () => {
    it('Get all Postulation', done => {
      server
        .get('/postulations')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, postulations } = JSON.parse(res.text);
          success.should.be.equal(true);
          postulations.should.be.instanceOf(Array);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('Voter endpoints', () => {
    it('Can vote', done => {
      server
        .get(`/voter-can-vote/${INFO.TEST_ID}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${INFO.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { success, canVote } = JSON.parse(res.text);
          success.should.be.equal(true);
          canVote.should.be.equal(true);
          done();
        })
        .catch(err => done(err));
    });
  });
});
