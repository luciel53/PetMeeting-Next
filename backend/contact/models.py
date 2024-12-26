from django.db import models
from django.contrib import admin

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    topic = models.CharField(max_length=100)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

# new class to see our messages in our admin interface
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'topic', 'message', 'date')
