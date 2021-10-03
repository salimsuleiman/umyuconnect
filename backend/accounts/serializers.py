
from django.forms import fields
from rest_framework import serializers
from .models import User
from django.forms.fields import ImageField
from posts.models import Post
from posts.serializers import PostSerializer, CommentSerializer


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture', 'varified']

class CurrentPost(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'text','date_created']

class CurrentUserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    liked_posts = CurrentPost(many=True)
    posts = PostSerializer(many=True)
    
    class Meta:
        model = User
        fields = (
                    'id', 
                    'first_name',
                    'last_name',
                    'username',
                    'email',
                    'profile_picture',
                    'gender',
                    'bio', 
                    'date_of_birth',
                    'varified',
                    'postiton',
                    'date_joined',
                    'is_staff',
                    'is_active',
                    'posts',
                    'liked_posts' 
                 )

