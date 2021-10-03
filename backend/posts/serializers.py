from django.db import models
from rest_framework import serializers
from .models import Post, Comment
from django.forms.fields import ImageField
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture', 'varified', 'first_name', 'last_name']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    class Meta:
        model = Comment
        fields = ['id','author', 'text', 'date_created']


class PostSerializer(serializers.ModelSerializer):
    likes = UserSerializer(many=True, read_only=True)
    author = UserSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = ['id', 'text', 'date_created', 'likes', 'author', 'comments']