from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, StringRelatedField
from iterdeciser import models


class AnswerSerializer(ModelSerializer):
    question = StringRelatedField(read_only=True)

    class Meta:
        model = models.Answer
        fields = ['title', 'question']


class ResponseSerializer(ModelSerializer):
    answer_set = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = models.Response
        fields = ['answer_set']


