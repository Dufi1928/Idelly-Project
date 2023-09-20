from django.urls import path
from .views import Register, Login, CheckIfUserExist, checkLoginView, UserView, LogoutView

urlpatterns = [
    path('Register', Register.as_view()),
    path('login', Login.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('checkLoginView', checkLoginView.as_view()),
    path('checkLoginView', checkLoginView.as_view()),
    path('CheckIfUserExist', CheckIfUserExist.as_view()),
]
