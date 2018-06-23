from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', auth_views.password_reset, {'post_reset_redirect': reverse_lazy('password_reset_done')}, name='password_reset'),
    path('done/', auth_views.password_reset_done, name='password_reset_done'),
    path('<uidb64>/<token>)/', auth_views.password_reset_confirm, name='password_reset_confirm'),
    path('complete/', auth_views.password_reset_complete, name='password_reset_complete')
]