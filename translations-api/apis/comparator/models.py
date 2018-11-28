from flask_restplus import Namespace, fields

ns = Namespace('compare', description='Operations connected with translations compare')

compare_translation = ns.model('CompareTranslations', {
    'key': fields.String,
    'valid_translation': fields.String,
    'translation_to_fix': fields.String,
})

compare_result_model = ns.model('CompareResult', {
    'comparision_result': fields.List(fields.Nested(compare_translation)),
    'session_key': fields.String,
})

fix_translation_model = ns.model('FixTranslation', {
    'key': fields.String,
})
