import boto3
import decimal
import json
from boto3.dynamodb.conditions import Key, Attr
import time
import logging

# ログ設定
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# DB設定
dynamodb = boto3.resource('dynamodb')
posts_table = dynamodb.Table('posts')
sequence_table = dynamodb.Table('sequences')

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def lambda_handler(event, context):
    
    logging.info(json.dumps(event))
    user_id = event["user_id"]
    text = event["text"]

    unixtime_now = int(time.time())

    response = sequence_table.update_item(
        Key={
            'table': 'posts',
        },
        UpdateExpression="set cnt = cnt + :val",
        ExpressionAttributeValues={
            ':val': decimal.Decimal(1)
        },
        ReturnValues="UPDATED_NEW"
    )
    
    id = int(response["Attributes"]["cnt"])
    post_item = {
        "id": id,
        "user_id": user_id,
        "content": text,
        "unixtime": unixtime_now
    }

    posts_table.put_item(Item = post_item)

    # TODO implement
    return json.dumps(post_item, cls=DecimalEncoder)