from flask import Flask, render_template, request, jsonify, flash
from flask_wtf import FlaskForm
from flask_pagedown import PageDown
from flask_pagedown.fields import PageDownField
from wtforms.fields import SubmitField
import nltk
import re
from more_itertools import intersperse
import requests

nltk.download('punkt')

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
pagedown = PageDown(app)
model = 'sp_int16_en'

class TranslateForm(FlaskForm):
    pagedown = PageDownField('Escreva o texto a traduzir')
    submit = SubmitField('Traduzir')

translation = ''

@app.route('/', methods=['GET', 'POST'])
def index():
    form = TranslateForm()
    translation = ''
    pair = "pttt" #Default
    if form.validate_on_submit():
        text = form.pagedown.data
        if len(text) > 1000:
            translation="Texto demasiado longo, por favor reduza para traduzir.\n\nTestu naruk tebes! Favor ida bele reduz hodi tradús."
        else:
            text_list =  re.split('(\n)', text)
            tok_list = []
            for p in text_list:
                if len(p)>1:
                    tok_list.append(list(intersperse(' ', nltk.sent_tokenize(p))))
                else: 
                    tok_list.append(p)
            text_list = [sent for par in tok_list for sent in par ]
            pair = request.form['lang']
            for text in text_list:
                if len(text) > 1:
                    res = requests.post('https://server-dot-tetumtra.appspot.com/trans/', json={'model': model, 'pair': pair, 'text': text})
                    if res.ok:
                        translation = translation + res.json()['translation']
                    else:
                        print(res)
                else:
                    translation = translation + text
    else:
        form.pagedown.data = ('Uma experiência com aprendizagem automática de tétum, mas ainda muito por fazer!')
    return render_template('index.html', form=form, pair=pair, text=translation)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='localhost', port=8080, debug=True)
