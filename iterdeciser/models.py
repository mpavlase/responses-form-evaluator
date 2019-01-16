from django.db import models


class Response(models.Model):
    """High level object that wraps one set of pairs (question, answer)"""
    enabled = models.BooleanField(default=True)
    note = models.CharField(max_length=200, blank=True)
    iteration_count = models.IntegerField(default=0)

    def __str__(self):
        ret = '{} ({})'.format(self.note, self.iteration_count)

        if not self.enabled:
            ret += ' [inactive]'

        return ret


class Question(models.Model):
    """A question that can be answered by multiple responses as an Answer."""
    title = models.CharField(max_length=200)
    hidden = models.BooleanField(default=False)
    responses = models.ManyToManyField(Response, through='Answer')

    def __str__(self):
        ret = self.title

        if self.hidden:
            ret += ' [hidden]'

        return ret


class Answer(models.Model):
    """Represents single entry as an Answer to a Question
    as one piece of Response"""
    title = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response = models.ForeignKey(Response, on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {} ({})'.format(self.question,
                                    self.title,
                                    self.response)
