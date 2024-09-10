// auth.test.js
const express = require('express');
const User = require('../Models/userSchema,'); // Assuming you have a userSchema model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock some functions for testing purposes
jest.mock('jsonwebtoken');
jest.mock('../Models/userSchema,')
const authRouter = require('../www/router/auth');

describe('auth routes', () => {
  let mockReq, mockRes, next;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = { json: jest.fn(), status: jest.fn() };
    next = jest.fn();
  });

  describe('POST /register', () => {
    it('should register a new user and return a token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10); // Simulate hashing

      mockUserSave = jest.fn().mockResolvedValue({ _id: '123', email, password: hashedPassword });
      User.mockImplementation(() => ({ save: mockUserSave })); // Mock User model

      mockReq.body = { email, password };
      await authRouter.post('/register')(mockReq, mockRes, next);

      expect(mockUserSave).toHaveBeenCalledWith(); // Assert user.save is called
      expect(mockRes.status).toHaveBeenCalledWith(200); // Assert successful response
      expect(mockRes.json).toHaveBeenCalledWith({ token: expect.any(String) }); // Assert token in response
    });

    it('should handle existing user registration error', async () => {
      const email = 'existing@example.com';

      const mockFindOne = jest.fn().mockResolvedValue({ email }); // Simulate existing user
      User.mockImplementation(() => ({ findOne: mockFindOne }));

      mockReq.body = { email, password: 'any' };
      await authRouter.post('/register')(mockReq, mockRes, next);

      expect(mockFindOne).toHaveBeenCalledWith({ email }); // Assert user search
      expect(mockRes.status).toHaveBeenCalledWith(500); // Assert error response
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuario ya registrado' }); // Assert error message
    });

    it('should handle other errors', async () => {
      const error = new Error('Database error');

      mockUserSave = jest.fn().mockRejectedValue(error);
      User.mockImplementation(() => ({ save: mockUserSave }));

      mockReq.body = { email: 'test@example.com', password: 'password123' };
      await authRouter.post('/register')(mockReq, mockRes, next);

      expect(mockUserSave).toHaveBeenCalledWith(); // Assert user.save is called
      expect(mockRes.status).toHaveBeenCalledWith(500); // Assert error response
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Usuario ya registrado' }); // Assert generic error message (consider adjusting)
    });
  });
})
  describe('POST /login', () => {
    it('should login a user with correct credentials and return a token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10); // Simulate hashing
      const userId = '123';

      const mockUser = { _id: userId, email, password: hashedPassword };
      const mockFindOne = jest.fn().mockResolvedValue(mockUser);
      const mockCompare = jest.fn().mockResolvedValue(true); // Simulate successful password comparison

      User.mockImplementation(() => ({ findOne: mockFindOne }));
      bcrypt.compare = mockCompare;

      mockReq.body = { email, password };
      await authRouter.post('/login')(mockReq, mockRes, next);

      expect(mockFindOne).toHaveBeenCalledWith({ email }); // Assert user search
      expect(mockCompare).toHaveBeenCalledWith(password, hashedPassword); // Assert password comparison
      expect(jwt.sign).toHaveBeenCalledWith({ userId }, expect.any(String), { expiresIn: '1h' }); // Assert token generation
      expect(mockRes.status).toHaveBeenCalledWith(200); // Assert successful response
      expect(mockRes.json).toHaveBeenCalled
    })})