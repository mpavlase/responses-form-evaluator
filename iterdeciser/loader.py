import csv
from iterdeciser import models


def data_loader(filename):
    with open(filename, newline='') as fd:
        reader = csv.reader(fd, delimiter=',', quotechar='"')

        # remove all previous entries
        models.Answer.objects.all().delete()
        models.Question.objects.all().delete()
        models.Response.objects.all().delete()

        header = next(reader)
        questions = []

        for question in header:
            q = models.Question(title=question)
            q.save()

            questions.append(q)

        for row in reader:
            response = models.Response()
            response.save()

            for index, column in enumerate(row):
                answer = models.Answer()
                answer.title = column
                answer.question = questions[index]
                answer.response = response
                answer.save()
