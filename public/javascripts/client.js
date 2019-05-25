// add comment delete and all manipulation 
var option = document.querySelector('#option');
var hide = option.options[option.selectedIndex].value;
var show;
function run() {
    option = document.querySelector('#option');
    show=option.options[option.selectedIndex].value;

    document.getElementById(show).style.display = "block"
    document.getElementById(hide).style.display="none"
    hide=show;
}
// fetch all book 

fetch("/api/books").then(res=>res.json()).then(data=>{
    var bookList = document.querySelector("#booklist");
    var bookdetails = document.querySelector("#bookdetails");
    var commentList = document.querySelector('#commentlist');
    data.map(d=>{
            var node=document.createElement('LI');
            var textnode = document.createTextNode(d.name);
            node.appendChild(textnode);
            node.setAttribute("class","book")
            bookList.appendChild(node);
            node.addEventListener("click",()=>{
                var bnode = document.createElement('LI');
                var textnode = document.createTextNode("Book- " + d.name +",  Comments: "+ d.comment);
                bnode.appendChild(textnode);
                bnode.setAttribute("class", "book")
                bookdetails.appendChild(bnode);
                if(d.comments.length>0){
                d.comments.map(comment=>{
                    var edit = document.createElement("button")
                    var cdel = document.createElement('button')
                    var editcomm = document.createElement('button')
                    editcomm.setAttribute("class","btn editsub");
                    editcomm.appendChild(document.createTextNode("Submit"))
                    var newcomblock = document.createElement('div')
                    newcomblock.setAttribute("id",comment.split(' ').join(''))
                    newcomblock.setAttribute("class","newcomblock");
                    var newcom = document.createElement('input')
                    newcom.setAttribute("book",d.name)
                    newcom.setAttribute("comment", comment)
                    newcom.setAttribute("name","newcomment")
                    newcom.setAttribute("id","newcom")
                    newcomblock.appendChild(newcom);
                    newcomblock.appendChild(editcomm);
                    
                    var etext=document.createTextNode('Edit')
                    var deltext = document.createTextNode("Delete");
                    cdel.setAttribute("book",d.name);
                    cdel.setAttribute("comment",comment);
                    edit.appendChild(etext);
                    cdel.appendChild(deltext);
                    edit.setAttribute("class","btn com edit");
                    cdel.setAttribute("class","btn com del")
                    var cnode = document.createElement('LI');
                    var ctext = document.createTextNode(comment);
                    cnode.appendChild(ctext);
                    commentList.appendChild(cnode);
                    cnode.appendChild(edit);
                    cnode.appendChild(cdel);
                    cnode.appendChild(newcomblock);

                    //Comment Manipulation
                    // Edit comments

                    edit.addEventListener("click",()=>{
                            var id = "#"+comment.split(' ').join('');
                            
                           var comentinput = document.querySelector(id)
                           comentinput.style.display = "block";
                           editcomm.addEventListener("click", () => {
                               var book = newcom.getAttribute('book');
                               var newcomment = newcom.value;
                               var oldcomment = newcom.getAttribute('comment');
                               var http = new XMLHttpRequest();
                               http.open('PUT', '/api/editcomment/' + book + '/' + oldcomment + '/' + newcomment, true);
                               http.send();

                               window.location.href = '/'
                           })
                    })

                    //del comment

                    cdel.addEventListener("click",()=>{
                        var book = cdel.getAttribute('book');
                        var comment = cdel.getAttribute("comment");
                        var http = new XMLHttpRequest();
                        http.open('DELETE', '/api/commentdelete/' + book + "/" + comment, true)
                        http.send();

                        window.location.href = "/";

                    })
                })
            }
            else{
                 var cnode = document.createElement('LI');
                 var ctext = document.createTextNode("No Commnents");
                 cnode.appendChild(ctext);
                 commentList.appendChild(cnode);
            }
            })
    }) 
})

// delete a book

var delet = document.querySelector("#delet");

delet.addEventListener("click", (e) => {
           var title = document.querySelector("#delete #name");
            var http = new XMLHttpRequest();
            http.open('DELETE', '/api/delete/'+title.value, true)
            http.send();

            window.location.href = "/";
        })

// all book delete 
var allDelete = document.querySelector("#alldelet");

allDelete.addEventListener("click",(e)=>{
    var http = new XMLHttpRequest();
    http.open('DELETE','/api/alldelete',true)
    http.send();

    window.location.href ="/";
})

// add Comment
var comment = document.querySelector("#coment");

comment.addEventListener("click", (e) => {
    var title = document.querySelector("#comment #title");
    var text = document.querySelector("#comment #commenttext");
    // alert(title.value)
    var http = new XMLHttpRequest();
    http.open('PUT', '/api/addcomment/'+title.value+"/"+text.value, true)
    http.send();

    window.location.href = "/";
})


