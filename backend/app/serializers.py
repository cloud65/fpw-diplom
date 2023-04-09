from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *

class LoginSerializers(serializers.Serializer):
    login = serializers.CharField(max_length=150, allow_null=True)
    password = serializers.CharField(max_length=150, allow_null=True)
    email = serializers.CharField(max_length=150, allow_null=True)

    def validate(self, data):
        username = data.get('login')
        password = data.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                msg = 'Неверный логин или пароль'
                raise serializers.ValidationError(msg, code='authorization')

        data['user'] = user
        return data