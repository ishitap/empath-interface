from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Index page'

@app.route('/user/<username>')
def hello(username):
	return 'Hello %s' % username

if __name__ == '__main__':
    app.run(debug=True)
