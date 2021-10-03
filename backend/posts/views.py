from rest_framework import serializers
from .models import  Comment, User, Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CommentSerializer, PostSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# from accounts.serializers import CurrentUserLikeSerializer
import random 


@api_view(['GET'])
def Feed(request):
   query = list(Post.objects.all())
   random.shuffle(query)

   serializer = PostSerializer(query, many=True)
   data = serializer.data

   return Response(data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreatePost(request):
    print(request.user)
    post = Post(text=request.data['text'], author=request.user)
    post.save()
    serializer = PostSerializer(post,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def GetPost(request, postID):
    try:
        post = Post.objects.get(pk=postID)
    except Post.DoesNotExist:
        return Response({'detail': 'post does not exist'}, 404)

    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def LikePost(request, id):
    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response({'detail': 'post does not exist'}, 404)
    
    
    post.likes.add(author=request.user)
    post.save()

    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data, 200)



def DeletePost(request):
    ...
def EditPost(request):
    ...

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateComment(request, postID):
    try:
        post = Post.objects.get(pk=postID)
    except Post.DoesNotExist:
        return Response({'details': 'not post found'})

    comment = Comment(text=request.data['text'], author=request.user, post=post)
    comment.save()
    serializer = CommentSerializer(comment,many=False)
    return Response(serializer.data)