from flask import Flask, render_template, request, jsonify, flash, current_app
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
    pagedown = PageDownField()
    submit_pt = SubmitField('Traduzir texto')
    submit_tt = SubmitField('Tradús testu')
    submit_en = SubmitField('Translate text')

translation = ''

@app.route('/tradutor-portugues-tetum.html', methods=['GET', 'POST'])
@app.route('/index.html', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def pttt():
    translation = ""
    form = TranslateForm()
    pair = "pttt" #Default
    if form.validate_on_submit():
        text = form.pagedown.data   
        translation = translate(text,pair)
    else:
        form.pagedown.data = ("Escreva aqui o texto que quer traduzir.")
    return render_template('tradutor-portugues-tetum.html', form=form, pair=pair, text=translation)

@app.route('/tradutor-tetun-portuges.html', methods=['GET', 'POST'])
def ttpt():
    translation = ""
    form = TranslateForm()
    pair = "ttpt" #Default
    if form.validate_on_submit():
        translation = ""
        text = form.pagedown.data
        translation = translate(text,pair)
    else:
        form.pagedown.data = ("Hakerek iha ne'e testu ne'ebé hakarak tradús.")
    return render_template('tradutor-tetun-portuges.html', form=form, pair=pair, text=translation)

@app.route('/translator-tetum-portuguese.html', methods=['GET', 'POST'])
def ttpt_en():
    translation = ""
    form = TranslateForm()
    pair = "ttpt" #Default
    if form.validate_on_submit():
        translation = ""
        text = form.pagedown.data
        translation = translate(text,pair)
    else:
        form.pagedown.data = ("Hakerek iha ne'e testu ne'ebé hakarak tradús.")
    return render_template('translator-tetum-portuguese.html', form=form, pair=pair, text=translation)

@app.route('/sitemap.xml')
def sitemap():
#    console.log('cheguei')
    return current_app.send_static_file('sitemap.xml')

def translate(text,pair):
        if len(text) > 1000:
            translation = "Texto demasiado longo, por favor reduza para traduzir.\n\nTestu naruk tebes! Favor ida bele reduz hodi tradús."
        else:
            translation = ''
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
                        client = {
                            'user_agent': request.environ.get('HTTP_USER_AGENT'),
                            'lang': request.environ.get('HTTP_ACCEPT_LANGUAGE'),
                            'country': request.environ.get('HTTP_X_APPENGINE_COUNTRY'),
                            'city': request.environ.get('HTTP_X_APPENGINE_CITY'),
                            'region': request.environ.get('HTTP_X_APPENGINE_REGION'),
                            'latlong': request.environ.get('HTTP_X_APPENGINE_CITYLATLONG')
                        }
                        print(client)
                        res = requests.post('https://server-dot-tetumtra.appspot.com/trans/', json={'model': model, 'pair': pair, 'text': text, 'client': client})
                        if res.ok:
                            translation = translation + res.json()['translation']
                        else:
                            print(res)
                else:
                    translation = translation + text
        return translation

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='localhost', port=8080, debug=True)
