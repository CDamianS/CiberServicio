from django.db import models

# Create your models here.
class User(models.Model):
    tag = models.CharField(max_length=20)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tag} ({self.role})"