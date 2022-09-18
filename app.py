from crypt import methods
from flask import Flask

app = Flask(__name__,static_folder='templates')

@app.route('/')
@app.route('/index',methods=['GET','POST'])
def index():
    pass

