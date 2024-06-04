from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

# Create your models here.

class SchedulePayment(models.Model):
    account = models.CharField(max_length=10)
    bank_code = models.CharField(max_length=5)
    account_name = models.CharField(max_length=80)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now=True)
    has_paid = models.BooleanField(default=False)
    pay_date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f'Scheduled By {self.created_by.username} for {self.account_name}'
