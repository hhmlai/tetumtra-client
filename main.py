from flask import Flask, render_template, request, jsonify
from flask_wtf import FlaskForm
from flask_pagedown import PageDown
from flask_pagedown.fields import PageDownField
from wtforms.fields import SubmitField
import requests

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
pagedown = PageDown(app)
model_type = 'ct2_int16'

class TranslateForm(FlaskForm):
    pagedown = PageDownField('Escreva o texto a traduzir')
    submit = SubmitField('Traduzir')


@app.route('/', methods=['GET', 'POST'])
def index():
    form = TranslateForm()
    translation = ''
    pair = "pttt" #Default
    if form.validate_on_submit():
        text = form.pagedown.data
        text_list = text.splitlines()
        translation = ''
        pair = request.form['lang']
        for text in text_list:
            if len(text) > 0:
                res = requests.post('https://server-dot-tetumtra.appspot.com/trans/', json={'model': model_type + '/'+ pair, 'text': text})
                if res.ok:
                    translation = translation + res.json()['translation'] + '\n'
                else:
                    print(res)
    else:
        form.pagedown.data = ('Teste aqui o tradutor')
    return render_template('index.html', form=form, pair=pair, text=translation)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='localhost', port=8080, debug=True)