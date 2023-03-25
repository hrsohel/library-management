if(window.location.pathname === "/admin.html") {
  var issuedBook = JSON.parse(localStorage.getItem("issueBook"))
  if(loginUser.role !== "admin") location.href = "/"
  var requestContainer = document.querySelector(".request-container")
  requestContainer.innerHTML = issuedBook.map(function(value) {
    return `
          <div class="m1">
            <div class="m2">${value.user}</div>
            <div class="m2">${value.book}</div>
            <div class="m2">${books.map(function(book) {
              
              if(book.id === value.book) return book.name
            }).join("")}</div>
            <div class="m2">
              <input onclick = "updateQuantity(${value.book}, ${value.user})" value="Accept Request" />
            </div>
          </div>
          `
  }).join("")
}

function updateQuantity(book, user) {
    var issuedBookByUser = JSON.parse(localStorage.getItem("issuedBook")) 
    var issuedBook = JSON.parse(localStorage.getItem("issueBook"))
    books.find(function(value) {
        if(value.id === book) value.quantity -= 1 
    })
    users.find(function(value) {
        if(value.id === user) {
            value.issueBook.push(book)
            value.quantity += 1
        }
    })
    localStorage.setItem("books", JSON.stringify({books: books}))
    localStorage.setItem("users", JSON.stringify({users: users}))
    issuedBook = issuedBook.filter(function(value){
      if(value.book !== book) return value
    })
    issuedBookByUser.push({book: book, user: user})
    localStorage.setItem("issueBook", JSON.stringify(issuedBook))
    localStorage.setItem("issuedBook", JSON.stringify(issuedBookByUser))
    location.href = "/admin.html"
}