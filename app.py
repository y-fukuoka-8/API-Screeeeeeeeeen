from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

people = []
next_id = 1

@app.route('/api/people', methods=['POST'])
def add_person():
    global next_id
    person = request.json
    person['id'] = next_id
    next_id += 1
    people.append(person)
    return jsonify(person), 201

@app.route('/api/peoples', methods=['GET'])
def get_people():
    return jsonify(people), 200

@app.route('/api/people/<int:id>', methods=['GET'])
def get_person(id):
    person = next((p for p in people if p['id'] == id), None)
    if person is None:
        return jsonify({'error': 'Person not found'}), 404
    return jsonify(person), 200

@app.route('/api/people/<int:id>', methods=['DELETE'])
def delete_person(id):
    global people
    people = [p for p in people if p['id'] != id]
    return '', 204

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/people_list')
def people_list():
    return render_template('people_list.html')

if __name__ == '__main__':
    app.run(debug=True)
