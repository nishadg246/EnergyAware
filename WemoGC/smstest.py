from twilio.rest import TwilioRestClient
 
# Your Account Sid and Auth Token from twilio.com/user/account
account_sid = "AC760a4ad9d6624d2bebf0c4acf632de6c"
auth_token  = "884e32d004ede86dc6e458ca82a66de2"
client = TwilioRestClient(account_sid, auth_token)
 
message = client.messages.create(body="Hey!",
    to="+16107149355",    # Replace with your phone number
    from_="+12672625546") # Replace with your Twilio number
print message.sid