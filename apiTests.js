const http = require('http');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000/api';

function testRegisterUser() {
  const postData = JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(data);
      assert.strictEqual(res.statusCode, 201, 'Expected status code 201');
      assert.strictEqual(response.message, 'User registered successfully', 'Unexpected response message');
      console.log('testRegisterUser passed');
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

function testLoginUser() {
  const postData = JSON.stringify({
    email: 'john.doe@example.com',
    password: 'Password123!',
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(data);
      assert.strictEqual(res.statusCode, 200, 'Expected status code 200');
      assert.strictEqual(response.message, 'You have logged in successfully', 'Unexpected response message');
      console.log('testLoginUser passed');
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

function testGetTasks() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tasks',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(data);
      assert.strictEqual(res.statusCode, 200, 'Expected status code 200');
      assert(Array.isArray(response), 'Expected response to be an array');
      console.log('testGetTasks passed');
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
}

// Run the tests
testRegisterUser();
setTimeout(testLoginUser, 1000); // Add delay to ensure user is registered
setTimeout(testGetTasks, 2000); // Add delay to ensure login is complete