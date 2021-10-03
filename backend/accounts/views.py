from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, CurrentUserSerializer
from django.contrib.auth import authenticate


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def GetUser(request):
   Serializer = CurrentUserSerializer(request.user, many=False)
   return Response(Serializer.data, 200)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def Login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user is None:
        return Response({'Detail': 'Wrong Credentials'}, 400)
    else:
         Serializer = CurrentUserSerializer(user, many=False)
         return Response({'user': Serializer.data, 'token': Token.objects.get_or_create(user=user).key}, 200)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def LogoutUser(request):
    Token.objects.get(user=request.user).delete()
    return Response({'detail': 'user successfully logged out'}, 200)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_user_profile(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'detail': 'Sorry user is not Found'}, 404)
    Serializer = CurrentUserSerializer(user, many=False)
    return Response(Serializer.data, 200)



@api_view(['POST'])
def SignUp(request):
    print(request.POST, request.data)
    user = User(
        username=request.data['username'],
        first_name=request.data['first_name'],
        last_name=request.data['last_name'],
        email=request.data['email'],
    )
    user.set_password(request.data['password'])
    user.save()
    return Response({"user": UserSerializer(user, many=False).data, 'Token': Token.objects.get(user=user).key})