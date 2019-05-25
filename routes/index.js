var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Book = require('../models/schema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Personal Library' });
});

router.get('/api/books', (req, res) => {
  Book.find({},(error,books)=>{
    if(error)
       return res.send(error)

    return res.send(books); 
  })
})


router.get('/api/book', (req, res) => {
  
  Book.findOne({name:req.query.title}, (error, book) => {
    if (error)
      return res.send(error)
    
    if(book!==null)
         res.send(book);
    else
      res.send("Book does not exist");

  })
 
})

router.post('/api/books',(req,res)=>{
 
  if(req.body.bookname !==""){
  var newBook = new Book({
    name:req.body.bookname,
    comment:0
  })

  newBook.save((error,data)=>{
    if(error)
        res.send(error)

     res.send(data);   
  })
}else{
  res.send("Please enter proper book name");
}
})

router.delete('/api/delete/:title',(req,res)=>{
var title = req.params.title;
Book.findOneAndDelete({name:title},(error,data)=>{
  if(error)
      res.send(error);
  else
     res.send(data);    
})

})

router.delete('/api/alldelete', (req, res) => {
  
  Book.deleteMany({},(error)=>{
    if(error)
      return res.send(error);
  })

  res.send("Database is empty now")
})


router.put('/api/addcomment/:title/:comment',(req,res)=>{
    var title = req.params.title;
    var comment=req.params.comment;
   
    Book.findOne({ name : title }, (error,data) => {
      if(error)
        res.send(error);

      if(data!==null){
        var count = +data.comment;
        data.comment = count+1;
        data.comments.push(comment);

        data.save((error,book)=>{
          if(error)
            res.send(error)
 
          res.send(book.comments);
        });
      } 
      else{
        res.send("data is not found")
      } 
    })
})

router.put('/api/editcomment/:book/:oldcomment/:newcomment',(req,res)=>{
  
  var book = req.params.book;
  var oldcomment = req.params.oldcomment;
  var newcomment = req.params.newcomment;

  Book.findOne({name:book},(error,data)=>{
    if(error)
      res.send(error)

    if(data!==null){
      var index = data.comments.indexOf(oldcomment);
      if(index>=0){
        data.comments.splice(index,1,newcomment);
        data.save((error,d)=>{
          if(error)
              res.send(error)

          res.send(data);    
        })
      }
      
  }
  else{
    res.send("Book not found");
  }  
  })

})

router.delete('/api/commentdelete/:book/:comment', (req, res) => {
  var book=req.params.book;
  var comment=req.params.comment;

  Book.findOne({name:book},(error,data)=>{

    if(error)
        res.send(error);

    if(data!==null){
      var index = data.comments.indexOf(comment);
      if(index>=0){
        data.comments.splice(index,1);
        data.comment = +data.comment-1;
        data.save((error,d)=>{
          if(error)
            res.send(error)

          res.send(d);  
        })
      }
      else{
        res.send("Comment not found")
      }
    }
    else{
      res.send("Book not found");
    }    
  })
})

module.exports = router;
