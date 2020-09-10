const { expect, should, Product, server, chai } = require("./helpers.js")

describe('Products', () => 
{
    let id;
    before(done =>
    {
        Product.deleteMany({}, () => done());
    });

    after(done =>
    {
        Product.deleteMany({}, () => done());
    });


    /*
    * Test the /GET route
    */
    describe('/GET', () =>
    {
        it('it should GET empty array of products', done =>
        {
            chai.request(server)
                .get('/')
                .end((_, res) =>
                {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(0);
                    done();
                });
        });
    });

    describe("/POST", () =>
    {
        it("it should not create product with empty product_name", done =>
        {
            const product = { product_name: "" }
            chai.request(server)
            .post("/")
            .send(product)
            .end((_, res) =>
            {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.should.have.own.property("error");
                done();
            })
        })

        it("it should create product with non-empty product_name", done =>
        {
            const product = { product_name: "prod name" }
            chai.request(server)
            .post("/")
            .send(product)
            .end((_, res) =>
            {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.should.not.have.own.property("error");
                expect(res.body.data.id).to.be.a("string");
                id = res.body.data.id;
                done();
            })
        })
    })

    describe("GET/:id", () =>
    {
        it("should be able to find newly created product", done =>
        {
            chai.request(server)
            .get(`/${id}`)
            .end((_, res) =>
            {
                expect(res.status).to.equal(200);
                expect(res.body).to.not.have.ownProperty("error");
                expect(res.body.id).to.be.a("string")
                done();
            })
        })
    })
});