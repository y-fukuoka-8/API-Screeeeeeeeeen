import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_add_person(client):
    response = client.post('/api/people', json={'name': 'John Doe'})
    assert response.status_code == 201
    json_data = response.get_json()
    assert json_data['name'] == 'John Doe'
    assert 'id' in json_data

def test_get_people(client):
    client.post('/api/people', json={'name': 'John Doe'})
    response = client.get('/api/peoples')
    assert response.status_code == 200
    json_data = response.get_json()
    assert len(json_data) == 1
    assert json_data[0]['name'] == 'John Doe'

def test_get_person(client):
    response = client.post('/api/people', json={'name': 'John Doe'})
    person_id = response.get_json()['id']
    response = client.get(f'/api/people/{person_id}')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['name'] == 'John Doe'

def test_get_person_not_found(client):
    response = client.get('/api/people/999')
    assert response.status_code == 404

def test_delete_person(client):
    response = client.post('/api/people', json={'name': 'John Doe'})
    person_id = response.get_json()['id']
    response = client.delete(f'/api/people/{person_id}')
    assert response.status_code == 204
    response = client.get(f'/api/people/{person_id}')
    assert response.status_code == 404
