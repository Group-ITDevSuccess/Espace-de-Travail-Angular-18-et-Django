from django.urls import path, include
from rest_framework import routers
from . import views
import os


urlpatterns = [
    path(os.getenv('REGISTER_USER_API'), views.register_user, name='register_user'),
    path(os.getenv('LOGIN_USER_API'), views.login_user, name='login_user'),
    path(os.getenv('LOGOUT_USER_API'), views.logout_user, name='logout_user'),
    path(os.getenv('DELETE_USER_API'), views.delete_user, name='delete_user'),
    path(os.getenv('GET_TODOS_API'), views.get_todos, name='get_todos'),
    path(os.getenv('ADD_TODO_API'), views.add_todo, name='add_todo'),
    path(os.getenv('UPDATE_TODO_API'), views.update_todo_status, name='update_todo_status'),
]
