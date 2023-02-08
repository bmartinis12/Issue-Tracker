const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Every Field POST request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .post('/api/issues/projects')
      .set('content-type', 'application/json')
      .send({
        issue_title: "Issue",
        issue_text: "Functional Test",
        created_by: "ben",
        assigned_to: "fCC",
        status_text: "open",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        deleteID = res.body._id;
        assert.equal(res.body.issue_title, "Issue")
        assert.equal(res.body.issue_text, "Functional Test")
        assert.equal(res.body.created_by, "ben")
        assert.equal(res.body.assigned_to, "fCC")
        assert.equal(res.body.status_text, "open")
        done();
      })
  })

  test('Only Required Field POST request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .post('/api/issues/projects')
      .set('content-type', 'application/json')
      .send({
        issue_title: "Issue",
        issue_text: "Functional Test",
        created_by: "ben",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        deleteID = res.body._id;
        assert.equal(res.body.issue_title, "Issue")
        assert.equal(res.body.issue_text, "Functional Test")
        assert.equal(res.body.created_by, "ben")
        assert.equal(res.body.assigned_to, "")
        assert.equal(res.body.status_text, "")
        done();
      })
  })

  test('Missing Required Field POST request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .post('/api/issues/projects')
      .set('content-type', 'application/json')
      .send({
        issue_title: "Issue",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing');
        done();
      })
  })

  test('View ISSUE GET request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .get('/api/issues/get_issues_test_367837')
      .end((err, res) => {
        assert.equal(res.status, 200);
        deleteID = res.body._id;
        assert.equal(res.body.length, 1)
        done();
      })
  })

  test('View ISSUE One Filter GET request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .get('/api/issues/get_issues_test_161385')
      .query({
        created_by: "Alice"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        deleteID = res.body._id;
        assert.equal(res.body.length, 3)
        done();
      })
  })

  test('View ISSUE One Filter GET request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .get('/api/issues/get_issues_test_161385')
      .query({
        created_by: "Alice",
        assigned_to: "Bob"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        deleteID = res.body._id;
        assert.equal(res.body.length, 2)
        done();
      })
  })

  test('PUT request 1 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put('/api/issues/projects')
      .send({
        created_by: "Ben2",
        _id: "63e40c2e7a75285b80975b03",
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully updated")
        assert.equal(res.body._id, "63e40c2e7a75285b80975b03")
        done();
      })
  })
  
  test('PUT request 2 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put('/api/issues/projects')
      .send({
        assigned_to: "Ricky",
        created_by: "Ben2",
        _id: "63e40c2e7a75285b80975b03",
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully updated")
        assert.equal(res.body._id, "63e40c2e7a75285b80975b03")
        done();
      })
  })

  test('PUT request 3 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put('/api/issues/projects')
      .send({
        assigned_to: "Ricky",
        created_by: "Ben2",
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "missing _id")
        done();
      })
  })

  test('PUT request 4 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put('/api/issues/projects')
      .send({
      _id: "63e40c2e7a75285b80975b03",
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "no update field(s) sent")
        done();
      })
  })

  test('PUT request 5 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put('/api/issues/projects')
      .send({
      _id: "zzzzzzz",
      assigned_to: "Tim",
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "could not update")
        done();
      })
  })

  test('DELETE request 1 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete('/api/issues/get_issues_test_631095')
      .send({
        _id: '63e407f728a1f2a87989f9cc',
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully deleted")
        done();
      })
  })

  test('DELETE request 2 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete('/api/issues/projects')
      .send({
        _id: 'zzzzz',
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "could not delete")
        done();
      })
  })

  test('DELETE request 3 to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete('/api/issues/projects')
      .send({
        assigned_to: "Dave", 
        issue_title: "projects"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "missing _id")
        done();
      })
  })
});
