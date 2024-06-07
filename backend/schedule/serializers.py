from rest_framework import serializers
from . import models
from . import utils


class SchedulePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SchedulePayment
        fields = ['account', 'bank_code','account_name', 'amount', 'pay_date', 'created_by']

    def create(self, validated_data):
        '''
            Override the serializer create so it could create a
            transfer recipient when the data is validated
        '''
        instance = super().create(validated_data)
        recipient_f = utils.create_transfer_recipient(instance.account, instance.bank_code, instance.account_name)
        print(recipient_f)
        recip = models.TransferRecipient.objects.create(
            recipient_code=recipient_f['data']['recipient_code'], payment=instance)
        return instance

class BankResolveSerializer(serializers.Serializer):
    account_number = serializers.CharField(max_length=10, required=True)
    bank_code = serializers.CharField(max_length=10, required=True)


