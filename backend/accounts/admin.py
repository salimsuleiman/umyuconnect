from django.contrib import admin
from .models import User
from django.contrib.admin.models import *


admin.site.register([User])
