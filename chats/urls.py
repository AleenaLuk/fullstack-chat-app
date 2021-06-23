from django.urls import path
from .views import MessageListAPIView
from .views import MessageDetailAPIView
app_name='chats'
urlpatterns = [
    path('', MessageListAPIView.as_view(), name ="message_list"), #name is optional, but better use it..
    path('<int:pk>/', MessageDetailAPIView.as_view(), name='message_list_detail')
]
