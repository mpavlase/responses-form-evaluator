from django.core.management.base import BaseCommand
from iterdeciser.loader import data_loader


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('file',
                            help='CSV file with content')

    def handle(self, *args, **options):
        data_loader(options['file'])
