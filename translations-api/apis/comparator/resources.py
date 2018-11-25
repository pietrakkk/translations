import json
import os
from uuid import uuid4

from flask import request, send_from_directory
from flask_restplus import Resource

from apis.comparator.models import compare_result_model, ns, fix_translation_model
from apis.comparator.parsers import upload_parser
from core.helpers import read_json_content, save_json_file
from service.translation.translation_comparision import TranslationsComparisionService, TranslationResponse


@ns.route('/')
class CompareTranslations(Resource):

    @ns.expect(upload_parser)
    @ns.marshal_list_with(compare_result_model)
    def post(self):
        from app import translator_app

        try:
            valid_translation = read_json_content(
                request.files['valid_translation']
            )
            translation_to_fix = read_json_content(
                request.files['translation_to_fix']
            )
        except ValueError as exc:
            ns.abort(400, message=str(exc))

        comparator = TranslationsComparisionService(
            valid_translation=valid_translation,
            translation_to_fix=translation_to_fix
        )

        session_key = str(uuid4())

        path = os.path.join(
            translator_app.config['SAVE_DIRECTORY'],
            f'{session_key}.json'
        )
        save_json_file(path, translation_to_fix)

        return TranslationResponse(
            comparator.compare_translations(),
            session_key
        )


@ns.route('/fix/')
class FixTranslation(Resource):

    @ns.expect([fix_translation_model])
    def post(self):
        if not request.headers.get('Session-Key'):
            ns.abort(400, message='Session-Key header missing')

        filename = f'{request.headers["Session-Key"]}.json'

        from app import translator_app
        file_path = os.path.join(
            translator_app.config['SAVE_DIRECTORY'],
            filename
        )

        payload = json.loads(request.data)

        TranslationsComparisionService.fill_transcription_file(payload, file_path)

        return send_from_directory(
            translator_app.config['SAVE_DIRECTORY'],
            filename,
            as_attachment=True
        )
