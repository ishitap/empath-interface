from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user/<username>')
def hello(username):
	return 'Hello %s' % username

if __name__ == '__main__':
    app.run()
