from flask import Flask,request, url_for, redirect, render_template
import scraping1

app = Flask(__name__)


@app.route('/')

def hello_world():
    return render_template('iframe.html')


@app.route('/predict',methods=['POST','GET'])

def predict():
    link = request.form['link']
        
    print("scraping...")
    print('received url is ',link)

    output = scraping1.scrape(link)

    return render_template('iframe.html',pred_pos='{}'.format(output[0]), 
    	pred_neg='{}'.format(output[1]))


if __name__ == '__main__':
    app.run()

