from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models
from . import utils


class SchedulePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SchedulePayment
        fields = ['account', 'bank_code','account_name', 'amount', 'pay_date']

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

    def save(self):
        '''
            Overriding the save method to add the request user instance as it
            creator
        '''
        request = self.context['request']
        user = request.user
        validated_data = self.validated_data
        validated_data['created_by'] = user
        return super().save()


class BankResolveSerializer(serializers.Serializer):
    account_number = serializers.CharField(max_length=10, required=True)
    bank_code = serializers.CharField(max_length=10, required=True)

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['pk', 'username']


