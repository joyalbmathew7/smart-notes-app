from django.urls import path
from .views import RegisterView, UserDetailView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("me/", UserDetailView.as_view()),
]
