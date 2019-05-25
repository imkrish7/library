
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const router = require('../routes/index.js')

chai.use(chaiHttp);

suite('Functional Test',()=>{


    test("#example Test GET /api/books " ,(done)=>{

        chai.request(router)
            .get('/api/books')
            .end((error,res)=>{
                assert.equal(res.status,200);
                assert.isArray(res.body,"response should be an array");
                assert.property(res.body[0],"comment","Books in array should contain comment which is counts of comments")
                assert.property(res.body[0],"name","Books in array should contain name")
                assert.property(res.body[0],"_id","Books in array should contain _id")
                done();
            });
    });


    suite('Routing Test',()=>{


        suite('POST /api/books with title => create book object/expect book object',()=>{

            test('Test POST /api/books with title',(done)=>{
                chai.request(router)
                    .post('/api/books')
                    .send({name:'Hemlet'})
                    .end((error,res)=>{
                        assert.equal(res.status,200);
                        assert.equal(res.body.name,'Hemlet')
                        done();
                    });
            });

            test('Test POST /api/books with no tittle givent',(done)=>{
                chai.request(router)
                    .post('/api/books')
                    .send({})
                    .end((error,res)=>{
                        assert.equal(res.status,200)
                        assert.equal(res.body.name,"")
                        done();
                    });
            });

        });

        suite("GET /api/books => array of books",()=>{

            test("Test GET /api/books ", (done)=>{
                chai.request(router)
                    .get('/api/books')
                    .query({})
                    .end((error,res)=>{
                        assert.equal(res.status,200)
                        assert.isArray(res.body)
                        done()        
                    });
            });
        });

        suite("GET /api/book/name => book object with name",()=>{

            test("Test GET /api/book/name with name not in db",(done)=>{
                chai.request(router)
                    .get('/api/book/Hemlet')
                    .end((error,res)=>{
                        assert.equal(res.status,200)
                        assert.equal(res.text,"Book does not exist")
                        done()
                    });
            });

            test("Test GET /api/book/name with name  in db", (done) => {
                chai.request(router)
                    .get('/api/book/'+name)
                    .end((error, res) => {
                        assert.equal(res.status, 200)
                        assert.equal(res.body.name,name )
                        done()
                     });
             });
        });

        suite("POST /api/addcomment/name =>add comment/expect book name",()=>{
            test("Test /api/addcomment/name with comment",(done)=>{
                chai.request(router)
                    .put('/api/addcomment/'+name)
                    .send({comments:'comment'})
                    .end((error,res)=>{
                        assert.equal(res.status,200)
                        assert.isArray(res.body.comments);
                        assert.include(res.body.comments,'comment');
                        done()
                    });
            });
        });


    })
})