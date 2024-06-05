from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

# Create your models here.

class SchedulePayment(models.Model):
    account = models.CharField(max_length=10, unique=True)
    bank_code = models.CharField(max_length=5)
    account_name = models.CharField(max_length=80)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now=True)
    has_paid = models.BooleanField(default=False)
    pay_date = models.DateTimeField(default=timezone.now)
    auto_pay_after = models.BooleanField(default=False)
    

    def __str__(self) -> str:
        return f'Scheduled By {self.created_by.username} for {self.account_name}'

    @classmethod
    def not_paid(cls):
        return cls.objects.filter(has_paid=False)

    @classmethod
    def not_paid_today(cls):
        return [ins for ins in cls.not_paid() if \
            (ins.pay_date.days >= timezone.now().days)
        ]

class TransferReceipt(models.Model):
    reference = models.TextField()
    status = models.CharField(max_length=16)
    payment = models.OneToOneField(SchedulePayment, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'Transaction: {self.reference}'

class PaidPayment(models.Model):
    date_paid = models.DateTimeField(auto_now_add=True)
    schedule_pay = models.ForeignKey(SchedulePayment, on_delete=models.CASCADE)

    def __str__(self):
        return f'Paid Account:{self.schedule_pay.account} on {self.date_paid}'
