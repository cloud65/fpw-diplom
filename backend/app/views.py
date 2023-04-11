from django.contrib.auth import logout
from django.contrib.auth.models import update_last_login
from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app.serializers import LoginSerializers


class LoginAPIView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializers(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        update_last_login(None, user)
        token, created = Token.objects.get_or_create(user=user)
        result = dict(
            status=status.HTTP_200_OK,
            token=token.key,
        )
        return Response(result)

    def get(self, request, *args, **kwargs):
        if request.user is None:
            return PermissionDenied()
        result = dict(
            status=status.HTTP_200_OK,
            user=dict(name=request.user.username,
                      groups=request.user.groups.values_list('name')
                      )
        )
        return Response(result)


class LogoutAPIView(APIView):
    def get(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        logout(request)
        result = dict(status=status.HTTP_200_OK)
        return Response(result)


class CheckAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"status": status.HTTP_200_OK, "Token": 0})
