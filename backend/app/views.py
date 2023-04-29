from django.contrib.auth import logout
from django.contrib.auth.models import update_last_login, User
from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import Machinery, Reference, UserProfile, Maintenance, Reclamation
from app.serializers import LoginSerializers, CheckMachinerySerializer, MachinerySerializer, ReferenceSerializer, \
    MachinerySaveSerializer, UserProfileSerializer, MaintenanceSerializer, MaintenanceSaveSerializer, \
    ReclamationSerializer, ReclamationSaveSerializer


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None


def get_right(user):
    if user is None:
        return 0
    if user.is_superuser:
        return 1
    groups = user.groups.values_list('name', flat=True)
    if 'manager' in groups:
        return 1
    elif 'service' in groups:
        return 2
    elif 'client' in groups:
        return 3
    return 0


def get_errors(serializer):
    default_errors = serializer.errors
    field_names = []
    for field_name, field_errors in default_errors.items():
        field_names.append(field_name)
    return Response({'error': f'Неверные значения {field_names}'}, status=status.HTTP_400_BAD_REQUEST)


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
            user=dict(id=request.user.id,
                      name=request.user.username,
                      organization_name=request.user.profile.organization_name,
                      groups=request.user.groups.values_list('name', flat=True)
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
        machine = get_or_none(Machinery, number=request.query_params.get('number'))
        if machine is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        result = CheckMachinerySerializer(machine)
        return Response({"status": status.HTTP_200_OK, "data": result.data})


class ReferenceAPIView(APIView):
    def get(self, request, *args, **kwargs):
        right = get_right(request.user)
        if not right:
            return Response(status=status.HTTP_403_FORBIDDEN)
        query_set = Reference.objects.filter().order_by('name')
        serializer = ReferenceSerializer(query_set, many=True)
        sections = ['model', 'motor', 'transmission', 'bridge_drv', 'bridge_ctrl',
                    'form_maintenance', 'unit', 'recovery', 'organization']
        result = {key: [] for key in sections}
        for row in serializer.data:
            result[sections[row['section'] - 1]].append(row)

        for group in ['client', 'service']:
            users = User.objects.filter(groups__name=group)
            query_set = UserProfile.objects.exclude(organization_name__exact='').filter(user__in=users)
            serializer = UserProfileSerializer(query_set.order_by('organization_name'), many=True)
            result[group] = serializer.data

        return Response({"status": status.HTTP_200_OK, "data": result})


class ReferenceEditAPIView(APIView):
    def get(self, request, action=None, *args, **kwargs):
        query_set = Reference.objects.filter(section=int(action)).order_by('name')
        serializer = ReferenceSerializer(query_set, many=True)
        return Response({"status": status.HTTP_200_OK, "data": serializer.data})

    def post(self, request, action=None, *args, **kwargs):
        right = get_right(request.user)
        if right != 1:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if action == 'create':
            serializer = ReferenceSerializer(data=request.data)
        else:
            serializer = ReferenceSerializer(get_or_none(Reference, guid=action), data=request.data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "data": serializer.data})
        return get_errors(serializer)


class MachineryAPIView(APIView):
    def get(self, request, guid=None, *args, **kwargs):
        right = get_right(request.user)
        if guid is not None and right > 0:
            instance = get_or_none(Machinery, guid=guid)
            if instance is None:
                return Response(status=status.HTTP_404_FORBIDDEN)
            serializer = MachinerySerializer(instance)
            return Response({"status": status.HTTP_200_OK, "data": serializer.data})

        filter = {key: value for key, value in request.query_params.items() if value and Machinery.field_exists(key)}
        if right == 1:
            query_set = Machinery.objects.filter(**filter)
        elif right == 2:
            query_set = Machinery.objects.filter(service=request.user, **filter)
        elif right == 3:
            query_set = Machinery.objects.filter(client=request.user, **filter)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
        order = '' if request.query_params.get('order', 'ascending') == 'descending' else '-'
        serializer = MachinerySerializer(query_set.order_by(order + 'shipment'), many=True)
        return Response({"status": status.HTTP_200_OK, "data": serializer.data})

    def post(self, request, guid=None, *args, **kwargs):
        right = get_right(request.user)
        if right != 1:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if guid == 'create':
            serializer = MachinerySaveSerializer(data=request.data)
        else:
            serializer = MachinerySaveSerializer(get_or_none(Machinery, guid=guid), data=request.data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "data": serializer.data})

        return get_errors(serializer)


class TablesAPIView(APIView):
    model = object
    serializer = object
    save_serializer = object

    def get(self, request, guid=None, *args, **kwargs):
        right = get_right(request.user)

        filter = {key: value for key, value in request.query_params.items() if value and self.model.field_exists(key)}
        if request.query_params.get('number'):
            filter['machine__number'] = request.query_params.get('number')

        if right == 1:
            query_set = self.model.objects.filter(**filter)
        elif right == 2:
            query_set = self.model.objects.filter(service=request.user, **filter)
        elif right == 3:
            query_set = self.model.objects.filter(machine__client=request.user, **filter)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
        order = '' if request.query_params.get('order', 'ascending') == 'descending' else '-'
        serializer = self.serializer(query_set.order_by(order + 'date'), many=True)
        return Response({"status": status.HTTP_200_OK, "data": serializer.data})

    def post(self, request, guid=None, *args, **kwargs):
        right = get_right(request.user)
        if right == 0:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if guid == 'create':
            serializer = self.save_serializer(data=request.data)
        else:
            serializer = self.save_serializer(get_or_none(self.model, guid=guid), data=request.data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "data": serializer.data})

        return get_errors(serializer)


class MaintenanceAPIView(TablesAPIView):
    model = Maintenance
    serializer = MaintenanceSerializer
    save_serializer = MaintenanceSaveSerializer


class ReclamationAPIView(TablesAPIView):
    model = Reclamation
    serializer = ReclamationSerializer
    save_serializer = ReclamationSaveSerializer

    def post(self, request, guid=None, *args, **kwargs):
        right = get_right(request.user)
        if right == 3:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().post(request, guid, *args, **kwargs)
