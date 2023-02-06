document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})


function handleClick() {
    console.log()
}

function renderDogs(dogs) {
    let dogTable = document.getElementById("table-body");
        dogs.forEach(dog => {
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = 
            `<td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button onclick="handleClick()" id=${dog.id}>Edit</button></td>`
            tableRow.id = dog.id;
            dogTable.appendChild(tableRow);
    });
};

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => renderDogs(data))
};


