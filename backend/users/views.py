from rest_framework import generics
from rest_framework.decorators import api_view
from .models import Profile
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User


class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.select_related('user')
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # add the username to each profile
        for profile_data in data:
            user_id = profile_data['user']
            user = User.objects.get(pk=user_id) # obtain the object user complete
            profile_data['username'] = user.username
            print(user_id)
        return Response(data)

class ProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        user_serializer = UserSerializer(user, data=request.data, partial=True)

        profile = request.user.profile
        profile_serializer = ProfileSerializer(profile, data=request.data, partial=True)

        user_is_valid = user_serializer.is_valid()
        profile_is_valid = profile_serializer.is_valid()

        if user_is_valid and profile_is_valid:
            user_serializer.save()
            profile_serializer.save()
            return Response(profile_serializer.data)
        else:
            combined_errors = {}
            if not user_is_valid:
                combined_errors.update(user_serializer.errors)
            if not profile_is_valid:
                combined_errors.update(profile_serializer.errors)
            return Response(combined_errors, status=status.HTTP_400_BAD_REQUEST)
