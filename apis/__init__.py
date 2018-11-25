from flask_restplus import Api

from apis.comparator.resources import ns

api = Api(
    version='1.0',
    title='translator',
    description='Rest API for translation comparator app',
)

api.add_namespace(ns)
