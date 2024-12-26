from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# feature that allows to recover dynamically the user model used in Django
User = get_user_model()

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default=None, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(default='defaultUser.jpg', upload_to='profile.pics', blank=True)
    birthdate = models.DateField(default=None, blank=True, null=True)
    external_link = models.URLField(default=None, blank=True, null=True)
    facebook_link = models.URLField(default=None, blank=True, null=True)


    def __str__(self):
        return self.user.username

# to automatically create a profile when a user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
