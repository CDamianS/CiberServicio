# API URL configuration.
from django.urls import path
from .views import *

urlpatterns = [
    path('get-games-start-time', get_start_times),
    path('set-play-ended', set_play_ended, name='set_play_ended'),
    path('add-student-to-game', add_student_to_game, name='add_student_to_game'),
]