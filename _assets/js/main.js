window.onload = () => {
    const form = document.getElementById("todoForm")
    let todos = []
    const handleDelete = ({ _id }) => {
        todos = todos.filter(t => t._id !== _id)

        // METTRE A JOUR L'INTERFACE
        refetch()
    }
    const toggleUpdate = (todo) => {

        // autoriser la mise à jour
        const index = todos.findIndex(t => t._id == todo._id)
        todos[index].isUpdating = !todos[index].isUpdating

        // METTRE A JOUR L'INTERFACE
        refetch()
    }
    const handleUpdate = (event, todo) => {

        const name = event.target.value.trim()
        const index = todos.findIndex(t => t._id == todo._id)
        if(name){
            todo.name = name
            todo.updatedAt = new Date()
            todos[index] = todo
        } 

    }
    // form.addEventListener("submit", (event)=>{})
    const refetch = () => {
        // const ul = document.querySelector("ul")
        const ul = document.getElementById("todoList")

        ul.innerHTML = ""
        todos.forEach((todo) => {
            console.log(todo);
            // ul.innerHTML += `
            // <li>
            //     <span>${todo.name}</span>
            //     <button class="btn btn-primary">Update</button>
            //     <button class="btn btn-danger">Delete</button>
            // </li>
            // `
            const li = document.createElement("li")
            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Delete"
            deleteBtn.className = "btn btn-danger"
            deleteBtn.onclick = () => handleDelete(todo)
            const updateBtn = document.createElement("button")
            if (todo.isUpdating) {
                // updating
                const input = document.createElement("input")
                input.value = todo.name
                input.onchange = (event) => handleUpdate(event,todo)
                updateBtn.innerText = "Save"
                updateBtn.className = "btn btn-warning"
                li.appendChild(input)
            } else {
                // display
                const span = document.createElement("span")
                span.innerHTML = todo.name

                updateBtn.innerText = "Update"
                updateBtn.className = "btn btn-primary"
                li.appendChild(span)
            }

            updateBtn.onclick = () => toggleUpdate(todo)


            li.appendChild(updateBtn)
            li.appendChild(deleteBtn)

            ul.appendChild(li)
        })
    }
    form.onsubmit = (event) => {
        event.preventDefault()

        const input = form.querySelector("input")
        const todoName = input.value.trim()
        if (todoName) {
            const todo = {
                _id: Math.round(Math.random() * 8585415),
                name: todoName,
                updatedAt: null,
                isUpdating: false,
                createdAt: new Date()
            }
            form.reset()
            todos.push(todo)
            refetch()
        }
    }
}