document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

document.addEventListener("click", handleClick)
const dogForm = document.getElementById("dog-form");

function editDog(id) {
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(res => res.json())
    .then(dog => {
        dogForm.name.value = dog.name,
        dogForm.breed.value = dog.breed,
        dogForm.sex.value = dog.sex,
        dogForm.dataset.id = dog.id
    })
}

function editedDog(event) {
    let dog = {
        name: event.target.parentElement.name.value,
        breed: event.target.parentElement.breed.value,
        sex: event.target.parentElement.sex.value,
        id: event.target.parentElement.dataset.id
    }
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "Application/JSON",
            Accepts: "Application/JSON"
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        })
    })
    let foundDog = document.getElementById(`${dog.id}`)
    foundDog.children[0].innerText = dog.name;
    foundDog.children[1].innerText = dog.breed;
    foundDog.children[2].innerText = dog.sex;
    dogForm.reset();
}

function handleClick(event) {
    event.preventDefault();
    if (event.target.id === "edit-button") {
        editDog(event.target.dataset.id)
    } else if (event.target.id === "submit"){
        editedDog(event)
    }
}

function renderDogs(dogs) {
    let dogTable = document.getElementById("table-body");
        dogs.forEach(dog => {
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = 
            `<td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="edit-button" data-id=${dog.id}>Edit</button></td>`
            tableRow.id = dog.id;
            dogTable.appendChild(tableRow);
    });
};

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => renderDogs(data))
};


