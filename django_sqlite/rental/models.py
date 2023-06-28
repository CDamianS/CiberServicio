from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Student(models.Model):                                                                    # Modelo de alumnos que juegan
    id = models.CharField(primary_key=True, max_length=9)                                       # Matricula
    name = models.CharField(max_length=100, blank=True)                                                     # Nombre, opcional
    hash = models.CharField(max_length=1000, null=False, blank=False)                           # Hash de biometricos
    sanctioned = models.BooleanField(default=False)                                             # Booleano de si esta sancionado

class Plays(models.Model):                                                                      # Modelo de juegos por semana
    student = models.ForeignKey(Student, on_delete=models.PROTECT, null=False, blank=False)
    game = models.ForeignKey('Game', on_delete=models.PROTECT, null=False, blank=False)
    time = models.DateTimeField(auto_now_add=True)                                              # Fecha y hora en que jugó
    week = models.IntegerField(null=False, blank=False)                                         # Semana en que jugó
    year = models.IntegerField(null=False, blank=False)                                         # Año en que jugó

    def save(self, *args, **kwargs):
        # Calculate the week and year using the current date
        current_date = timezone.now()
        week_number = current_date.isocalendar()[1]
        year_number = current_date.year
        self.week = week_number
        self.year = year_number

        super().save(*args, **kwargs)

class Game(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)               # Nombre del juego, unico, para identificarlo en cualquier lugar y momento
    displayName = models.CharField(max_length=100, null=False, blank=False)                     # Nombre que se muestra en la lista de juegos
    available = models.BooleanField(default=True)
    show = models.BooleanField(default=True)                                                    # Booleano de si se muestra en la lista de juegos (Todavía se puede jugar o no)

class Sanction(models.Model):
    cause = models.CharField(max_length=255, null=False, blank=False)                           # Causa de la sancion, escrita por el usuario
    play = models.ForeignKey(Plays, on_delete=models.PROTECT, null=False, blank=False)
    student = models.ForeignKey(Student, on_delete=models.PROTECT, null=False, blank=False)

class Log(models.Model):
    actionPerformed = models.CharField(max_length=255, null=False, blank=False)                 # Accion realizada por el usuario
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)             # Usuario que realizo la accion