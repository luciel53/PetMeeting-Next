from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
urlpatterns = [
    # path('login/', views.LoginView.as_view(), name ='login'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('register/', views.RegisterView.as_view(), name ='register'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),
]
