from crypt import methods
from flask import Flask
import cohere

co = cohere.Client(co_key.x)

app = Flask(__name__,static_folder='templates')

@app.route('/')
@app.route('/index',methods=['GET','POST'])
def index():
    pass

