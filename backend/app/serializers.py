from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *


class LoginSerializers(serializers.Serializer):
    login = serializers.CharField(max_length=150, allow_null=True)
    password = serializers.CharField(max_length=150, allow_null=True)

    # email = serializers.CharField(max_length=150, allow_null=True)

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


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference


class CheckMachinerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Machinery
        fields = ['number', 'model', 'motor', 'motor_number', 'transmission', 'transmission_number',
                  'bridge_drv', 'bridge_drv_number', 'bridge_ctrl', 'bridge_ctrl_number']
        depth = 2


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'profile')
        depth = 2


class MachinerySerializer(serializers.ModelSerializer):
    service = UserSerializer()
    client = UserSerializer()

    class Meta:
        model = Machinery
        fields = '__all__'
        depth = 2


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = '__all__'
