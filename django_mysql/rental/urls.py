from django.urls import path
from django.contrib.auth.decorators import user_passes_test
from .views import *

# Functions
def _is_admin(user):
    return user.groups.filter(name='Administrator').exists()
def _is_scholar(user):
    return user.groups.filter(name='Scholar').exists()


urlpatterns = [
    path('', Rental.as_view(), name='rental'),
    path('scholar/', user_passes_test(_is_scholar)(Scholar.as_view()), name='scholar'),
    path('admin/', user_passes_test(_is_admin)(Admin.as_view()), name='admin'),
]