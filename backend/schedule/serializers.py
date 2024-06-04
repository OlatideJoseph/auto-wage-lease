from rest_framework import serializers
from . import models
class SchedulePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SchedulePayment
        fields = ['account', 'bank_code','account_name', 'pay_date', 'has_paid', 'auto_pay_after']

