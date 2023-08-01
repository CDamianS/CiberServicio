from django.urls import path
from django.contrib.auth.decorators import user_passes_test
from .views import *

# Functions
def _is_admin(user):
    return user.groups.filter(name='Administrator').exists()


urlpatterns = [
    #path('admin/', user_passes_test(_is_admin)(Admin.as_view()), name='admin'),
    path('admin',(Admin.as_view()), name='admin'),
    path('biometrics', biometricsAPI, name='biometrics')
]