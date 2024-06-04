from django.shortcuts import render
from rest_framework import generics, decorators
from . import models
from . import serializers
# Create your views here.

class CreateSchedulePaymentAPIView(generics.CreateAPIView):
    serializer_class = serializers.SchedulePaymentSerializer
    queryset = models.SchedulePayment.objects.all()


@decorators.api_view(['GET'])
def get_paystack_banks(request):
    return ''
