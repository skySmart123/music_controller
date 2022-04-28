from wsgiref.validate import validator
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields =('id','code','host','guest_can_pause',
                 'votes_to_skip','created_at')
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields =('guest_can_pause','votes_to_skip')
class UpdateRoomSerializer(serializers.ModelSerializer):
    #redefine code here, because we need to pass it into our 
    #fields, it can not be unique, and we have already defined 
    # a code in our models, which was set up as unique
    code  = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields =('guest_can_pause','votes_to_skip','code')
