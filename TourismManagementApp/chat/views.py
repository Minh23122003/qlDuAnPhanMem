from django.shortcuts import render
from rest_framework.response import Response
from .models import Room, Message


def join_or_create_room(request):
    room = request.POST['room_name']

    if Room.objects.filter(name=room).exists():
        return Response({room:room})
        # return redirect('/'+room+'/?username='+username)
    else:
        new_room = Room.objects.create(name=room)
        new_room.save()
        return Response({room:room})
        # return redirect('/'+room+'/?username='+username)

def send(request):
    message = request.POST['message']
    user = request.user.id
    room_id = request.POST['room_id']

    new_message = Message.objects.create(value=message, user=user, room=room_id)
    new_message.save()
    return Response('Message sent successfully')

def getMessages(request, room):
    room_details = Room.objects.get(name=room)

    messages = Message.objects.filter(room=room_details.id)
    return Response({"messages":list(messages.values())})