document.addEventListener('DOMContentLoaded', function() {
    fetchPeopleList();
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = '/';
    });
});

function fetchPeopleList() {
    fetch('/api/peoples')
    .then(response => response.json())
    .then(data => {
        const peopleList = document.getElementById('peopleList');
        peopleList.innerHTML = '';
        data.forEach(person => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = person.id;
            const nameCell = document.createElement('td');
            nameCell.textContent = person.name;
            row.appendChild(idCell);
            row.appendChild(nameCell);
            peopleList.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
