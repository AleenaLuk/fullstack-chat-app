from django.db import models
from django.conf import settings


class Message(models.Model):
    text = models.CharField(max_length=255)
    # https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#referencing-the-user-model
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
