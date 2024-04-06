const mongoose = require("mongoose");
const request = require("supertest");
require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });
  
afterEach(async () => {
    await mongoose.connection.close();
});

describe("test test", () => {
    it("should return 200", () => {
        expect(200).toBe(200);
    });
});
  
  

