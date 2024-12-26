from django.contrib import admin

# Register your models here.
from .models import Contact, ContactAdmin

admin.site.register(Contact, ContactAdmin)
