from django.db import models
from datetime import datetime


# Create your models here.
class Room(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    
class Message(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.CharField(max_length=255)
    date = models.DateTimeField(default=datetime.now, blank=True)
    user = models.IntegerField(max_length=255)
    room = models.CharField(max_length=255)