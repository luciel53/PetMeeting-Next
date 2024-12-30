from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
# from channels.db import database_sync_to_async

# from django.conf import settings


# login class
# class LoginView(APIView):
#     permission_classes = (IsAuthenticated, )

#     def get(self, request):
#         content = {'message':
#                    'Welcome to the JWT Authentication page using React\
#                     Js and Django!'}
#         return Response(content)

class CustomTokenObtainPairView(TokenObtainPairView):
    """ Use TokenObtainPairView to generates access and refresh tokens """
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # check user identifiants
        user = authenticate(username=username, password=password)
        if user is not None:
            # if authenticated , generates a token
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """ logout class """
    # only authenticated users can access this view
    permission_classes = (IsAuthenticated,)
    print("test", permission_classes)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    """ Register class """
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "This user name already exists"},
                            status=status.HTTP_400_BAD_REQUEST)

        # check if email already exists
        elif User.objects.filter(email=email).exists():
            return Response({"error": "This email already exists"},
                            status=status.HTTP_400_BAD_REQUEST)

        # create a new user
        user = User.objects.create(username=username, email=email,
                                   password=make_password(password))
        user.save()

        return Response({"success": "User created successfully"},
                        status=status.HTTP_201_CREATED)
