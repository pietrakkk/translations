import json
from typing import List


class InvalidTranslation:

    def __init__(self, key: str, valid_translation: str, translation_to_fix: str = None):
        self.valid_translation = valid_translation
        self.translation_to_fix = translation_to_fix
        self.key = key


class TranslationResponse:
    def __init__(self, comparision_result: List[InvalidTranslation], session_key: str):
        self.comparision_result = comparision_result
        self.session_key = session_key


class TranslationsComparisionService:
    EMPTY_TRANSLATION = ''

    def __init__(self, valid_translation: dict, translation_to_fix: dict):
        self._valid_translation = valid_translation
        self._translation_to_fix = translation_to_fix

    def compare_translations(self) -> List[InvalidTranslation]:
        result = list()

        for key, value in self._valid_translation.items():

            if self._translation_to_fix.get(key) is None:
                result.append(InvalidTranslation(
                    key=key,
                    valid_translation=value,
                    translation_to_fix=None,
                ))
                continue

            if self._has_invalid_translation(value, self._translation_to_fix[key]):
                result.append(InvalidTranslation(
                    key=key,
                    valid_translation=value,
                    translation_to_fix=self._translation_to_fix[key]
                ))

        return result

    @staticmethod
    def _has_invalid_translation(valid: str, to_check: str) -> bool:
        return valid.lower() != TranslationsComparisionService.EMPTY_TRANSLATION and \
               (to_check == TranslationsComparisionService.EMPTY_TRANSLATION or
                valid.lower() == to_check.lower())

    @staticmethod
    def fill_transcription_file(data_to_fill: dict, file_path: str):
        with open(file_path, 'r+') as f:
            data = json.load(f)

            for item in data_to_fill:
                data[item['key']] = item['translation_to_fix']

            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()
