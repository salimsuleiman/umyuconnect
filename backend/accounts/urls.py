from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('login/', obtain_auth_token),
    path('signup/', SignUp),
    path('user/', GetUser),
    path('logout/', LogoutUser),
    path('<str:username>/', get_user_profile),
]
