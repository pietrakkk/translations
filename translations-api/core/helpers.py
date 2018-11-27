import json
from json import JSONDecodeError

from werkzeug.datastructures import FileStorage


def read_json_content(input_file: FileStorage):
    try:
        return json.loads(input_file.read())

    except JSONDecodeError:
        raise ValueError(f'Nieprawidłowy format pliku {input_file.name} .')


def save_json_file(file_path, content: dict):
    with open(file_path, 'w') as f:
        json.dump(content, f)
