document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addPersonForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        addPerson(name);
    });

    document.getElementById('getAllPeople').addEventListener('click', function() {
        getAllPeople();
    });

    document.getElementById('getPersonForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('personId').value;
        getPerson(id);
    });

    document.getElementById('deletePersonForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('deletePersonId').value;
        deletePerson(id);
    });
});

function addPerson(name) {
    fetch('/api/people', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Added person: ${data.name} (ID: ${data.id})`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getAllPeople() {
    // ページ遷移を行う
    window.location.href = '/people_list';
}

function getPerson(id) {
    fetch(`/api/people/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deletePerson(id) {
    fetch(`/api/people/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        document.getElementById('result').innerText = `Deleted person with ID: ${id}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
