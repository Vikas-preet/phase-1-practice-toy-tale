//if we click on add toy again then it will come back to previous page
let addToy = false

//Get request
const getToyData = () => {
  return fetch("http://localhost:3000/toys").then((response) => response.json())
}

//post request function
const postToyData = (newToy) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  }
  return fetch("http://localhost:3000/toys", config).then((data) => data.json())
}

//Patch request
const updateLikes = (e) => {
  //it will increase the likes
  let numberOfLikes = parseInt(e.target.previousSibling.innerText)

  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      //patch will create new object with  updated likes in backend
      likes: (numberOfLikes += 1),
    }),
  }
  return fetch(`http://localhost:3000/toys/${e.target.id}`, config)
    .then((response) => response.json())
    .then(
      //to update dom: we take new likes from object and updating it
      (updatedObj) =>
        (e.target.previousSibling.innerText = `${updatedObj.likes} likes`)
    )
}

// to create a new card form to display content on DOM
const newCardForm = (toys) => {
  const divEl = document.createElement("div")
  divEl.classList.add("card")

  const h2 = document.createElement("h2")
  h2.textContent = toys.name

  const img = document.createElement("img")
  img.src = toys.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.textContent = `${toys.likes} Likes`

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.id = toys.id
  button.textContent = "Like ❤️"

  divEl.append(h2, img, p, button)

  return divEl
}
const toyCollection = document.getElementById("toy-collection")

// rendertoys will display toys on page
function renderToys(toysData) {
  toysData.forEach((toyData) => {
    toyCollection.appendChild(newCardForm(toyData))
  })
}

//DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

  //get request useed to display data through rendertoys function
  getToyData().then((data) => renderToys(data))

  const addToyForm = document.querySelector(".add-toy-form")

  //adding event listener on add toy form
  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }
    postToyData(newObj)
    renderToys([newObj])
  })

  //event listener to increase likes
  toyCollection.addEventListener("click", (e) => {
    updateLikes(e)
  })

  //if we double click on add toy form, then it will come back
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})
