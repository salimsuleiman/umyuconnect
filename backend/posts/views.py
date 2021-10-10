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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def LikePost(request, id):
    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response({'detail': 'post does not exist'}, 404)
    
    if request.user in post.likes.all():
        post.likes.remove(request.user)
        return Response({'datail': 'you have liked already, but its unliked now'}, 300)
    else: 
        post.likes.add(request.user)
        return Response({'datail': 'you are now liked'}, 200)

    # serializer = PostSerializer(post, many=False)
    # return Response(serializer.data, 200)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeletePost(request, postID):
    try:
        post = Post.objects.get(pk=postID)
    except Post.DoesNotExist:
        return Response({'details': 'not post found'})
    if request.user ==  post.author:
        post.delete()
        return Response({'Detail': 'post successfully deleted'})
    else:
        return Response({'Detail': 'this post does not belongs to this user'}, 404)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def EditPost(request, postID):
    try:
        post = Post.objects.get(pk=postID)
    except Post.DoesNotExist:
        return Response({'details': 'not post found'}, 404)

    if request.user == post.author:
        print(post)
        post.text = request.data['text']
        post.save()
        return Response({'detail': 'post successfully update'})
    else:
        return Response({'Detail': 'this post does not belongs to this user'}, 404)


   
    return Response

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