import os
from flask import Flask, render_template
from config.config import configure_app, configure_ui

app = Flask(__name__)

app_path = os.path.dirname(__file__)

configure_app(app)
configure_ui(app)


@app.route('/')
def homepage():
    return render_template(
        'home.html',
        title='Allocat'
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
