# Generated by Django 5.0.6 on 2024-06-05 14:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0006_transferrecipient_transaction_delete_transferreceipt'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedulepayment',
            name='auto_pay_after',
        ),
        migrations.AlterField(
            model_name='transaction',
            name='recipients',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='schedule.transferrecipient'),
        ),
        migrations.AlterField(
            model_name='transferrecipient',
            name='payment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='recipient', to='schedule.schedulepayment'),
        ),
    ]
