import aioboto3
from botocore.exceptions import BotoCoreError, ClientError

params = {
    "Source": "noreply@cyf.academy",
    "Destination": {"ToAddresses": ["volkov.nataliia@gmail.com"]},
    "Message": {
        "Subject": {"Data": "Test Email"},
        "Body": {"Html": {"Data": "<p>This is a test email from a CYF project.</p>"}},
    },
}


async def send_email():
    try:
        async with aioboto3.client("ses", region_name="eu-west-1") as ses:
            response = await ses.send_email(**params)
            print("Sent:", response["MessageId"])
            return response
    except (BotoCoreError, ClientError) as err:
        print("Error:", err)
        raise
