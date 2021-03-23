let add = document.querySelector("form button");
let section = document.querySelector("section");
add.addEventListener("click", e => {
    e.preventDefault()
    // get input value
    let form = e.target.parentElement
    let todoText = form.children[0].value
    let todoMounth = form.children[1].value
    let todoDate = form.children[2].value

    if (todoText === "") {
        alert("Please input text")
        //阻止後續事件執行
        return;
    }

    // create a todo
    let todo = document.createElement("div")
    todo.classList.add("todo")
    // create text and class
    let text = document.createElement("p")
    text.classList.add("todo-text")
    text.innerText = todoText
    // create time and class
    let time = document.createElement("p")
    time.classList.add("todo-time")
    time.innerText = todoMounth + "/" + todoDate
    // add child
    todo.appendChild(text)
    todo.appendChild(time)
    // create icon
    let completeButton = document.createElement("button")
    completeButton.classList.add("complete")
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement
        todoItem.classList.toggle("done")
    })

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    deleteButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement
        todoItem.addEventListener("animationend", () => {
            //remove todo item
            let text = todoItem.children[0].innerText
            let myListArray = JSON.parse(localStorage.getItem("list"))
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1)
                    localStorage.setItem("list", JSON.stringify(myListArray))
                }
            })
            todoItem.remove()
        })
        todoItem.style.animation = "scaleDown 0.3s forwards"
    })
    // add button
    todo.appendChild(completeButton)
    todo.appendChild(deleteButton)
    // add animation
    todo.style.animation = "scaleUp 0.3s forwards"
    //storage
    let myTodo = {
        todoText: todoText,
        todoMounth: todoMounth,
        todoDate: todoDate
    }
    let myList = localStorage.getItem("list")
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]))
    } else {
        let myListArray = JSON.parse(myList)
        myListArray.push(myTodo)
        localStorage.setItem("list", JSON.stringify(myListArray))
    }

    form.children[0].value = ""
    section.appendChild(todo)
})

let myList = localStorage.getItem("list")
if (myList !== null) {
    let myListArray = JSON.parse(myList)
    myListArray.forEach(item => {
        let todo = document.createElement("div")
        todo.classList.add("todo")
        let text = document.createElement("p")
        text.classList.add("todo-text")
        text.innerHTML = item.todoText
        let time = document.createElement("p")
        time.classList.add("todo-time")
        time.innerHTML = item.todoMounth + "/" + item.todoDate
        todo.appendChild(text)
        todo.appendChild(time)

        let completeButton = document.createElement("button")
        completeButton.classList.add("complete")
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement
            todoItem.classList.toggle("done")
        })

        let deleteButton = document.createElement("button")
        deleteButton.classList.add("delete")
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
        deleteButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement
            todoItem.addEventListener("animationend", () => {
                //remove todo item
                let text = todoItem.children[0].innerText
                let myListArray = JSON.parse(localStorage.getItem("list"))
                myListArray.forEach((item, index) => {
                    if (item.todoText == text) {
                        myListArray.splice(index, 1)
                        localStorage.setItem("list", JSON.stringify(myListArray))
                    }
                })
                todoItem.remove()
            })
            todoItem.style.animation = "scaleDown 0.3s forwards"
        })
        todo.appendChild(completeButton)
        todo.appendChild(deleteButton)
        section.appendChild(todo)
    });
}

