from django.db import models
from django.contrib.auth.models import User

class PlayerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100, blank=True)