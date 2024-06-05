import requests
from django.conf import settings

paystack_url = 'https://api.paystack.co/'

def initiate_transfer_payment(account: str, bank_code: str, account_name: str) -> None:
    data = {}
    resp = requests.post(f'{paystack_url}/transfer?currency=NGN', data=json.dumps(data))
    return


def resolve_account(account_number: str, bank_code: str):
    resp = requests.get(f'{paystack_url}/bank/resolve?account_number={account_number}&bank_code={bank_code}', headers={
        'Authorization': f'Bearer {settings.PAYSTACK_API}'
    })
    return resp.json()
