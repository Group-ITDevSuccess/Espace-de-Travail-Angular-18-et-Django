from . import models
from . import serializers
from rest_framework import  permissions, response, decorators, status
from rest_framework.authtoken.models import Token
from shared.white_log import write_log

@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.AllowAny])
def register_user(request):
    try:
        instance_serializer = serializers.CustomUserSerializer(data=request.data)
        if instance_serializer.is_valid():
            user = instance_serializer.save()
            token = Token.objects.create(user=user)
            response_data = {
                'token': token.key,
                'user': serializers.CustomUserSerializer(user).data
            }
            return response.Response(response_data, status=status.HTTP_201_CREATED)
        return response.Response(instance_serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.AllowAny])
def login_user(request):
    identifiant = request.data.get('username')
    password = request.data.get('password')
    write_log(str(request.data))
    try:
        if '@' in identifiant:
            user = models.CustomUser.objects.filter(email=identifiant).first()
        else:
            user = models.CustomUser.objects.filter(username=identifiant).first()
        if user and user.check_password(password):
            token,_ = Token.objects.get_or_create(user=user)
            response_data = {
                'token': token.key,
                'user': serializers.CustomUserSerializer(user).data
            }
            return response.Response(response_data, status=status.HTTP_200_OK)
        return response.Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@decorators.api_view(['DELETE'])
@decorators.permission_classes([permissions.IsAuthenticated])
def delete_user(request, uid):
    try:
        user = models.CustomUser.objects.get(uid=uid)
        if request.user == user or request.user.is_superuser:
            user.delete()
            return response.Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        return response.Response({"error": "You do not have permission to delete this user"}, status=status.HTTP_403_FORBIDDEN)
    except models.CustomUser.DoesNotExist:
        return response.Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    write_log(str(request.user))
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return response.Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return response.Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.IsAuthenticated])
def add_todo(request):
    try:
        data = request.data.copy()
        data['author'] = request.user.uid
        serializer = serializers.TodoSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            todo = serializer.save(author=request.user)
            return response.Response(serializers.TodoSerializer(todo).data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@decorators.api_view(['GET'])
@decorators.permission_classes([permissions.IsAuthenticated])
def get_todos(request):
    print(request.GET, request.data)
    try:
        todos = models.Todo.objects.filter(author=request.user)
        
        if 'status' in request.GET:
            status_value = request.GET.get('status').lower() == 'true'
            todos = todos.filter(status=status_value)
        
        if 'archived' in request.GET:
            archived_value = request.GET.get('archived').lower() == 'true'
            todos = todos.filter(archived=archived_value)
        
        return response.Response(serializers.TodoSerializer(todos, many=True).data, status=status.HTTP_200_OK)
    
    except models.Todo.DoesNotExist:
        return response.Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.IsAuthenticated])
def update_todo_status(request, uid):
    try:
        todo = models.Todo.objects.get(uid=uid, author=request.user)

        if 'archived' in request.data and request.data['archived']:
            if not todo.status:
                return response.Response({'error': 'Cannot archive a Todo with status False'}, status=status.HTTP_400_BAD_REQUEST)
        
        if 'status' in request.data:
            todo.status = request.data['status']
        
        if 'archived' in request.data:
            todo.archived = request.data['archived']
        
        todo.save()
        return response.Response(serializers.TodoSerializer(todo).data, status=status.HTTP_200_OK)
    
    except models.Todo.DoesNotExist:
        return response.Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        write_log(str(e))
        return response.Response({'error': "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)