from django.urls import path
from .views import Feed, CreatePost, GetPost, LikePost, CreateComment, DeletePost, EditPost

urlpatterns = [
    path('feed/', Feed),
    path('create/', CreatePost),
    path('like/<int:id>/', LikePost),
    path('<int:postID>/', GetPost),
    path('delete/<int:postID>/', DeletePost),
    path('update/<int:postID>/', EditPost),

    path('comments/add/<int:postID>/', CreateComment),
#     path('comments/delete/<int:postID>/', CreateComment),
#     path('comments/edit/<int:postID>/', CreateComment),
]
