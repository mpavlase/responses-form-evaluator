from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response as drf_Response
from iterdeciser.models import Answer, Response
from iterdeciser.serializers import AnswerSerializer, ResponseSerializer
from django.db.models import Min
from random import choice


class AnswerViewset(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ResponseViewset(ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

    def list(self, request, *args, **kwargs):

        return super().list(request, *args, **kwargs)


class NextResponseViewset(ViewSet):
    def list(self, request, *args, **kwargs):
        min_iterations = Response.objects.filter(enabled=True)
        min_iterations = min_iterations.aggregate(min=Min('iteration_count'))
        min_iterations = min_iterations['min']

        prev_response = request.session.get('previous_response', None)

        candidate_response = Response.objects.filter(
            enabled=True, iteration_count=min_iterations)

        if prev_response:
            candidate_response = candidate_response.exclude(pk=prev_response)

        response = choice(list(candidate_response))
        print(response)
        request.session['previous_response'] = response.pk

        response.iteration_count += 1
        response.save()

        resp = ResponseSerializer(response)
        return drf_Response(resp.data)

