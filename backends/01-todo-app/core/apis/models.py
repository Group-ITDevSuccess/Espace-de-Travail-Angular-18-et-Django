from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from uuid import uuid4

class CustomUser(AbstractUser):
    uid = models.UUIDField(verbose_name=_('uid'), primary_key=True, editable=False, default=uuid4)
    email = models.EmailField(_('email address'), blank=True)
    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
    
    def __str__(self) -> str:
        return self.username


class Todo(models.Model):
    uid = models.UUIDField(verbose_name=_('uid'), primary_key=True, editable=False, default=uuid4)
    title = models.CharField(max_length=150, blank=False, null=False, verbose_name=_('title'))
    description = models.TextField(blank=True, null=True, verbose_name=_('description'))
    created_at = models.DateTimeField(auto_now=True, verbose_name=_('created at'))
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name=_('updated at'))
    status = models.BooleanField(default=False, verbose_name=_('status'))
    archived = models.BooleanField(default=False, verbose_name=_('archived'))
    author = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='todos', blank=False, null=False, verbose_name=_('author'))
    
    def __str__(self):
        return self.title
