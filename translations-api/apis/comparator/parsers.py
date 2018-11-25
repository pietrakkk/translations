from flask_restplus import reqparse
from werkzeug.datastructures import FileStorage

upload_parser = reqparse.RequestParser()
upload_parser.add_argument('valid_translation', location='files', type=FileStorage, required=True)
upload_parser.add_argument('translation_to_fix', location='files', type=FileStorage, required=True)
