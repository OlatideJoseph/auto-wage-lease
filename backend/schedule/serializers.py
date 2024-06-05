from rest_framework import serializers
from . import models
class SchedulePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SchedulePayment
        fields = ['account', 'bank_code','account_name', 'pay_date', 'has_paid', 'auto_pay_after']

class BankResolveSerializer(serializers.Serializer):
    account_number = serializers.CharField(max_length=10, required=True)
    bank_code = serializers.CharField(max_length=5, required=True)


