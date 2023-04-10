from django.contrib.auth.models import update_last_login
from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app.serializers import LoginSerializers


class LoginAPIView(APIView):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializers(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        print(user)
        update_last_login(None, user)
        #token, created = Token.objects.get_or_create(user=user)
        #return Response({"status": status.HTTP_200_OK, "Token": token.key})
        #list(user.groups.values_list('name', flat=True))
        return Response({"status": status.HTTP_200_OK, "user": user.username})

    def get(self, request, *args, **kwargs):
        return Response({"status": status.HTTP_200_OK, "Token": 0})


class CheckAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"status": status.HTTP_200_OK, "Token": 0})
