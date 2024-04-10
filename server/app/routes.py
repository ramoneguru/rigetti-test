from app import app
from flask import jsonify
from flask_cors import CORS, cross_origin
import csv

# Setup up very basic Flask app using this article:
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world

# Had issue with CORS and found this article/package
# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/cycle')
@cross_origin()
def get_cycle_route():
    return get_cycle_data('app/data.csv')

def get_cycle_data(filename):
    data = []
    with open(filename, 'r') as file:
        # found article about how to read csv to json
        # https://medium.com/@techwithjulles/python-a-program-that-converts-a-csv-file-to-a-json-file-80c18446ac0b
        # found what DictReader does as well: https://docs.python.org/3/library/csv.html#csv.DictReader
        csv_reader = csv.DictReader(file)
        data = [row for row in csv_reader]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
