process.env.NODE_ENV = 'test';
const employee_Contact = require("../model/employeeDetails");
const employee_Leave_Details = require("../model/employeeLeave");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Employee', () => {
  describe('/GET Employee', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/employees/')
            .set({'Authorization':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiX2lkIjoiNWNmNGQwZjk3YzE3MDQ0MjNjOTEwOTcyIiwiZnVsbE5hbWUiOiJzZGEiLCJlbWFpbCI6InphYmFsaS5iYW54Z0BmaXB2LmNvbSIsInBhc3N3b3JkIjoiYjgzNWI2YWMzZWMzMDlkMmVkMDg3NjEyYzIxZDM3MTdiMWY4Mjc4NiIsImFkZHJlc3MiOiJ3ZXdkc3NmZHNmd2YiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1NTk3MTM3MzAsImV4cCI6MTU1OTgwMDEzMH0.EwABL1DHiqdyVOhmT_TsGzRXKsbEXO2U3594Sm93_zc'})
            .end((err, res) => {
              console.log(res.body,'res')
                  res.should.have.status(200);
                  res.body.should.be.a('array');

              done();
            });
      });
  });

describe('/Post EEmployee',()=>
{
  it("it should post particular employee details",(done)=>
  {
    let emp={
        isadmin : "true",
        isemployee: "false",
        role: 11,
        fullName: "sda",
        password : "2033",
        email : "zabali.badznxeg@fipv.com",
        mobile : "9633730830",
        gender : "male",
        DoB: "2053/03/23",
        contact:"aaa",
        address:"wewdssfdsfwf"
    }

    chai.request(server)
    .post('/api/employees')
    .set({'Authorization':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiX2lkIjoiNWNmNGQwZjk3YzE3MDQ0MjNjOTEwOTcyIiwiZnVsbE5hbWUiOiJzZGEiLCJlbWFpbCI6InphYmFsaS5iYW54Z0BmaXB2LmNvbSIsInBhc3N3b3JkIjoiYjgzNWI2YWMzZWMzMDlkMmVkMDg3NjEyYzIxZDM3MTdiMWY4Mjc4NiIsImFkZHJlc3MiOiJ3ZXdkc3NmZHNmd2YiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1NTk3MTM3MzAsImV4cCI6MTU1OTgwMDEzMH0.EwABL1DHiqdyVOhmT_TsGzRXKsbEXO2U3594Sm93_zc'})
    .send(emp)

    .end((err,res)=>
    {
      console.log(res.body)
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
  done();
    })
  })
})

// describe('/put emp id',()=>
// {

//   it('it should put a book by the given id', (done) => {

//   let emp=new Employee({
//     fullName : "tlcj.hugyukk gh..tt", 
//     email : "ahhhdakja", 
//     mobile : "23", 
//     city : "male"
//   })
//   emp.save((err,emp)=>{
//     chai.request(server)
//     .put('/employee/'+emp.id)
//     .send({fullName : "rrr", 
//     email : "ahhhdakja", 
//     mobile : "23", 
//     city : "ww"})
//     .end((err,res)=>{
//       console.log(res.body,'putput')
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       res.body.should.have.property('city').eql("ww");

//       done();
//     })
    
//   });

// })

// })




// describe('/DELETE/:id employee', () => {
//   it('it should DELETE a employee given the id', (done) => {
//       let emp = new Employee({fullName : "rrr", 
//       email : "ahhhdakja", 
//       mobile : "23", 
//       city : "ww"})
//       emp.save((err, emp) => {
//             chai.request(server)
//             .delete('/employee/' + emp.id)
//             .end((err, res) => {
//               console.log(res.body,"ash ash ash");
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   // res.body.result.should.have.property('ok').eql(1);
//                   res.body.should.have.property('n').eql(1);
//               done();
//             });
//       });
//   });
// });

}) 