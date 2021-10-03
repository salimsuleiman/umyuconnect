from django.urls import path
from .views import Feed, CreatePost, GetPost, LikePost, CreateComment

urlpatterns = [
    path('feed/', Feed),
    path('create/', CreatePost),
    path('like/<int:id>/', LikePost),
    path('<int:postID>/', GetPost),
    path('comments/add/<int:postID>/', CreateComment)
]
