import uuid

from django.contrib.auth.models import User
from django.db import models


class BaseModel(models.Model):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class Sections:
    model = 1
    motor = 2
    transmission = 3
    bridge_drv = 4
    bridge_ctrl = 5
    form_maintenance = 6
    unit = 7
    recovery = 8
    organization = 9

    @classmethod
    def choices(cls):
        return [
            (cls.model, "Модели техники"),
            (cls.motor, "Модели двигателя"),
            (cls.transmission, "Модели трансмиссии"),
            (cls.bridge_drv, "Модели ведущего моста"),
            (cls.bridge_ctrl, "Модели управляемого моста"),
            (cls.form_maintenance, "Виды ТО"),
            (cls.unit, "Узлы"),
            (cls.recovery, "Способы восстановления"),
            (cls.organization, "Организации, проводившие ТО"),
        ]


class Reference(BaseModel):
    section = models.IntegerField(verbose_name='Вид справочника', choices=Sections.choices())
    name = models.CharField(verbose_name='Название', max_length=250)
    description = models.TextField(verbose_name='Описание', null=True)

    class Meta:
        verbose_name = "Справочники"

    def __str__(self):
        return self.name


class ReferenceField(models.ForeignKey):
    def __init__(self, **kwargs):
        if kwargs.get('section', None) is not None:
            self.section = kwargs.pop('section')
        kwargs['related_name'] = '+'
        kwargs['on_delete'] = models.PROTECT
        kwargs.pop('to', None)
        super().__init__('app.reference', **kwargs)


class Machinery(BaseModel):
    number = models.CharField(verbose_name='Зав. № машины', max_length=25)
    model = ReferenceField(verbose_name='Модель техники', section=Sections.model)

    motor = ReferenceField(verbose_name='Модель двигателя', section=Sections.motor)
    motor_number = models.CharField(verbose_name='Зав. № двигателя', max_length=25)

    transmission = ReferenceField(verbose_name='Модель трансмиссии', section=Sections.transmission)
    transmission_number = models.CharField(verbose_name='Зав. № трансмиссии', max_length=25)

    bridge_drv = ReferenceField(verbose_name='Модель ведущего моста', section=Sections.bridge_drv)
    bridge_drv_number = models.CharField(verbose_name='Зав. № ведущего моста', max_length=25)

    bridge_ctrl = ReferenceField(verbose_name='Модель управляемого моста', section=Sections.bridge_ctrl)
    bridge_ctrl_number = models.CharField(verbose_name='Зав. № управляемого моста', max_length=25)

    contract = models.CharField(verbose_name='Договор поставки №, дата', max_length=50)
    shipment = models.DateField(verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(verbose_name='Грузополучатель (конечный потребитель)', max_length=250)
    address = models.CharField(verbose_name='Адрес поставки (эксплуатации)', max_length=512)
    equipment = models.TextField(verbose_name='Комплектация (доп. опции)')

    client = models.ForeignKey(User, verbose_name='Клиент',
                               on_delete=models.PROTECT, related_name='client_machines')
    service = models.ForeignKey(User, verbose_name='Сервисная компания',
                                on_delete=models.PROTECT, related_name='service_machines')

    class Meta:
        verbose_name = "Машины"

    def __str__(self):
        return f'{self.model}, зав. № {self.number}'

class Maintenance(BaseModel):
    form = ReferenceField(verbose_name='Вид ТО', section=Sections.form_maintenance)
    machine = models.ForeignKey(Machinery, verbose_name='Машина',
                                on_delete=models.PROTECT, related_name='maintenances')
    date = models.DateField(verbose_name='Дата проведения ТО')
    mileage = models.IntegerField(verbose_name='Наработка, м/час')
    order_number = models.CharField(verbose_name='№ заказ-наряда', max_length=15)
    order_date = models.DateField(verbose_name='Дата заказ-наряда')
    organization = ReferenceField(verbose_name='Организация, проводившая ТО', section=Sections.organization)
    service = models.ForeignKey(User, verbose_name='Сервисная компания',
                                on_delete=models.PROTECT, related_name='maintenances', null=True)

    class Meta:
        verbose_name = "Техническое обслуживание"

    def __str__(self):
        return f'{self.machine}, {self.form}, {self.date}'

class Reclamation(BaseModel):
    machine = models.ForeignKey(Machinery, verbose_name='Машина',
                                on_delete=models.PROTECT, related_name='reclamations')
    date = models.DateField(verbose_name='Дата отказа')
    mileage = models.IntegerField(verbose_name='Наработка, м/час')
    unit = ReferenceField(verbose_name='Узел отказа', section=Sections.unit)
    description = models.TextField(verbose_name='Описание отказа', null=False)
    recovery = ReferenceField(verbose_name='Способ восстановления', section=Sections.recovery)
    repair_units = models.TextField(verbose_name='Используемые запасные части', null=False)
    repair_date = models.DateField(verbose_name='Дата восстановления')
    downtime = models.IntegerField(verbose_name='Время простоя техники')
    service = models.ForeignKey(User, verbose_name='Сервисная компания',
                                on_delete=models.PROTECT, related_name='reclamations', null=True)

    class Meta:
        verbose_name = "Рекламации"

    def __str__(self):
        return f'{self.machine}, {self.unit}, {self.date}'