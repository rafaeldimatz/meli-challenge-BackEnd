//import index from '../src/index.js'
//import request from 'supertest' //Fetch
const app = require('../index')
const supertest = require('supertest')

const api=supertest(app)

describe('GET list products exists',()=>{
    test('should respon with 404 status code not params',async()=>{
       const response = await api.get('/api/items')
       expect(response.statusCode).toBe(500);
    })

    test('should respon with 200 status code',async()=>{
        const response = await api.get('/api/items?q=mate')
        expect(response.statusCode).toBe(200);
     })

     test('should response author',async()=>{
        const response = await api.get('/api/items?q=mate')
        expect(response.body.data.author).toStrictEqual({"lastname": "Dimatz","name": "Rafael"}); 
     })

     test('should have body ',async()=>{
      const response = await api.get('/api/items')
      expect(response.body).toBeDefined();
     })

     test('should have categories', async()=>{
      const response = await api.get('/api/items?q=mate')   
      expect(response.body.data.categories).toBeDefined()
     })

     test('should return object', async()=>{
      const response = await api.get('/api/items?q=mate')   
      expect(response.body.data).toMatchObject({})
     });

     test('should have a content-type: application/json in header', async()=>{
      const response = await api.get('/api/items?q=mate') 
      expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
     })

     test('should have items a field id', async()=>{
      const response = await api.get('/api/items?q=mate') 
      expect(response.body.data.items[0].id).toBeDefined();
     })

     test('should items return a array', async()=>{
      const response = await api.get('/api/items?q=mate') 
      expect(response.body.data.items).toBeInstanceOf(Array);
     })
})

describe('GET products detail exists',()=>{
      test('should details return a status 200', async()=>{
         const response = await api.get('/api/items/MLA1103525817') 
         expect(response.status).toBe(200);
      })

      test('should categories have a field description', async()=>{
         const response = await api.get('/api/items/MLA1103525817') 
         expect(response.body.data.item.description).toBeDefined();
     })
})
