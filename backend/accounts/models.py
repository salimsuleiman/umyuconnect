from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

gender_choices = (
    ('Male', 'Male'),
    ('Female', 'Female')
)
course_choices = [
    ('ACCOUNTING', 'ACCOUNTING'),
    ('ARABIC STUDIES', 'ARABIC STUDIES'),
    ('BIOCHEMISTRY', 'BIOCHEMISTRY'),
    ('BIOLOGY', 'BIOLOGY'),
    ('BUSINESS ADMINISTRATION', 'BUSINESS ADMINISTRATION'),
    ('CHEMISTRY', 'CHEMISTRY'),
    ('COMPUTER SCIENCE', 'COMPUTER SCIENCE'),
    ('ECONOMICS', 'ECONOMICS')
]


class User(AbstractUser):
    # required feilds
    username = models.CharField(verbose_name='Username', max_length=21, null=True,  unique=True)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='user_profile_pics', null=True, blank=True)
    varified =  models.BooleanField(default=False, null=True)
    first_name = models.CharField(
        verbose_name='First Name', max_length=25, null=True,  blank=False)
    last_name = models.CharField(
        verbose_name='Last Name', max_length=25, blank=False)
    gender = models.CharField(choices=gender_choices, null=True, max_length=7)
    date_of_birth = models.DateField(null=True, blank=False)
    postiton = models.CharField(
        choices=[('Student', 'Student')], blank=False, max_length=30)

    # optional feilds
    bio = models.TextField(blank=not True, null=True)
    course = models.CharField(choices=course_choices,
                              blank=True, null=True, max_length=30)

    def __str__(self) -> str:
        return self.username





@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def auth_user_create(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
