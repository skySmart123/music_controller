from django.shortcuts import render
from itsdangerous import Serializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
# Create your views here.

# def main(request):
#     return HttpResponse("<h1>Hello</h1>")

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request,format=None):
    #判断session是否exist，如果不exist，create一个新的
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
     #把request data 传送给serializer
        serializer = self.serializer_class(data= request.data)
    #如果serializer is valid
    #1. assign data
    #2. 查找是否这个host的queryset已经存在
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
    #如果存在
    #1. assign 
    #2.旧room save new data
    #3. return with ok 的status
            if queryset.exists():
               room = queryset[0]
               room.guest_can_pause = guest_can_pause
               room.votes_to_skip = votes_to_skip
               room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
               return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
     #如果不存在
    #1. 做一个新room
    #2.save
    #3.return with ok的status
            else:
               room = Room(host=host, guest_can_pause = guest_can_pause,votes_to_skip= votes_to_skip )
               room.save()
               return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


    # return not ok 的status
        return Response({'Bad Request':'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



