import os

from flask import Flask

from apis import api

translator_app = Flask(__name__)

translator_app.config['SAVE_DIRECTORY'] = os.path.join(translator_app.root_path, 'temp')
api.init_app(translator_app)

if __name__ == '__main__':
    translator_app.run(debug=True)
