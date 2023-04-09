import csv
from datetime import datetime
# exec(open('csv\import_data.py').read())
from app.models import *


def get_data(file_name):
    result = []
    with open(file_name) as csvfile:
        rows = list(csv.reader(csvfile, delimiter=';', quotechar='"'))
        keys = rows[0]
        for row in rows[1:]:
            data = {}
            for i in range(len(keys)):
                data[keys[i]] = row[i].replace('\\n', '\n')
            result.append(data)
    return result


def import_rows(model, rows):
    print(model)
    for d in rows:
        d.pop('_', None)
        for field in model._meta.fields:
            if isinstance(field, ReferenceField):
                value = d[field.name]
                ref = Reference.objects.filter(section=field.section, name=value).first()
                if ref is None:
                    ref = Reference.objects.create(section=field.section, name=value, description=value)
                d[field.name] = ref
            elif field.name == 'machine':
                d[field.name] = Machinery.objects.filter(number=d[field.name]).first()
            elif isinstance(field, models.ForeignKey):
                value = d.get(field.name, None)
                if value is not None:
                    ref = User.objects.filter(username=value).first()
                    if ref is None:
                        ref = User.objects.create(username=value)
                    d[field.name] = ref
            elif isinstance(field, models.DateField):
                try:
                    d[field.name] = datetime.strptime(d[field.name], '%d.%m.%Y')
                except:
                    pass

        row = model.objects.create(**d)



Reclamation.objects.all().delete()
Maintenance.objects.all().delete()
Machinery.objects.all().delete()


import_rows(Machinery, get_data(r'U:\diplom\backend\csv\1.csv'))
import_rows(Maintenance, get_data(r'U:\diplom\backend\csv\2.csv'))
import_rows(Reclamation, get_data(r'U:\diplom\backend\csv\3.csv'))