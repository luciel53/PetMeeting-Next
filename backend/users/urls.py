from django.urls import path
from . import views
from .views import ProfileListAPIView
from .views import ProfileDetailAPIView, UserDetailAPIView, UpdateProfileAPIView

urlpatterns = [
    path('profile/', ProfileListAPIView.as_view(), name='profile-list'),
    path('profile/<int:pk>', ProfileDetailAPIView.as_view(), name='profile-detail'),
    path('<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('profile/update/', UpdateProfileAPIView.as_view(), name='profile-update'),
]
