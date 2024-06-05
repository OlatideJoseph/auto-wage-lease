import json
import secrets
import requests
from django.conf import settings
from .models import TransferRecipient, Transaction

paystack_url = 'https://api.paystack.co/'

def initiate_transfer_payment(amount: str, recipient: str, reference: str) -> dict:
    '''
        This creates a transfer ref to be used with to be used
        to finalize the trf based on status but won't be active since
        paystack only allows transfer for registered business
    '''
    data = {
        'source': 'balance',
        'account_number': amount,
        'bank_code': recipient,
        'account_name': reference,
        'reason': 'test program'
    }
    resp = requests.post(f'{paystack_url}/transfer?currency=NGN', data=json.dumps(data), headers={
        'Authorization': f'Bearer {settings.PAYSTACK_API}'
    })
    return resp.json()


def resolve_account(account_number: str, bank_code: str) -> dict:
    resp = requests.get(f'{paystack_url}/bank/resolve?account_number={account_number}&bank_code={bank_code}', headers={
        'Authorization': f'Bearer {settings.PAYSTACK_API}'
    })
    return resp.json()


def finalize_transfer(trf_ref: str) -> dict:
    '''
       finalize a dummy ref and returns a transfer response
    '''

    return {'status': 'success'}

def create_transfer_recipient(account_number: str, bank_code: str, account_name: str):
    '''
       Creates the Transfer recoipients so that transfer can be 
       initiated.
    '''
    data = {
        'type': 'nuban',
        'account_number': account_number,
        'bank_code': bank_code,
        'name': account_name,
        'currency': 'NGN'
    }
    resp = requests.post(f'{paystack_url}/transferrecipient',
            data=json.dumps(data),
            headers={'Authorization': f'Bearer {settings.PAYSTACK_API}'})
    return resp.json()

