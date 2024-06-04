from django.urls import path
from . import views

urlpatterns = [
    path('', views.CreateSchedulePaymentAPIView.as_view(), name='create-schedule'),
]
