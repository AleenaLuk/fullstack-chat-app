from django.urls import path, include

from .views import MessageListAPIView

app_name = 'chats'

urlpatterns = [
    path('', MessageListAPIView.as_view(), name='chat_list'),

]
