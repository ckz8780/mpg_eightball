from django.contrib import admin
from django.urls import path, include
from . import views, urls_reset

urlpatterns = [
    path('logout/', views.logout, name='logout'),
    path('login/', views.login, name='login'),
    path('registration/', views.registration, name='registration'),
    path('profile/', views.profile, name='profile'),
    path('password_reset/', include(urls_reset)),
]