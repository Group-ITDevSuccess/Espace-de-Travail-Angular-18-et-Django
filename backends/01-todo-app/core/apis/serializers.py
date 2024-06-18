from rest_framework import serializers
from . import models
from shared.white_log import write_log

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['uid', 'username', 'email', 'last_name', 'first_name', 'password', 'is_active', 'is_staff', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = models.CustomUser(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                last_name=validated_data.get('last_name', ''),
                first_name=validated_data.get('first_name', ''),
            )
            user.set_password(validated_data['password'])
            user.save()
        except Exception as e:
            write_log(str(e))
            raise e
        return user


class TodoSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=models.CustomUser.objects.all())
    class Meta:
        model = models.Todo
        fields = ['uid','title', 'description', 'status','archived', 'author', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']
    
    
    def create(self, validated_data):
        try:
            todo = models.Todo.objects.create(**validated_data)
        except Exception as e:
            write_log(str(e))
            raise e
        return todo