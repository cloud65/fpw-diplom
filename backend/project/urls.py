"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.finders import find
from django.templatetags.static import static
from django.urls import path


from app.views import LoginAPIView, CheckAPIView, LogoutAPIView, MachineryAPIView, ReferenceAPIView, \
    ReferenceEditAPIView, MaintenanceAPIView, ReclamationAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', LoginAPIView.as_view()),
    path('api/logout', LogoutAPIView.as_view()),

    path('api/check', CheckAPIView.as_view()),

    path('api/refs/<str:action>', ReferenceEditAPIView.as_view()),
    path('api/refs', ReferenceAPIView.as_view()),

    path('api/machinery/<str:guid>', MachineryAPIView.as_view()),
    path('api/machinery', MachineryAPIView.as_view()),

    path('api/maintenance/<str:guid>', MaintenanceAPIView.as_view()),
    path('api/maintenance/machinery/<str:guid>', MaintenanceAPIView.as_view()),
    path('api/maintenance', MaintenanceAPIView.as_view()),

    path('api/reclamation/<str:guid>', ReclamationAPIView.as_view()),
    path('api/reclamation/machinery/<str:guid>', ReclamationAPIView.as_view()),
    path('api/reclamation', ReclamationAPIView.as_view()),

]
