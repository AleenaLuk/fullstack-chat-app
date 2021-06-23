from rest_framework import generics

from .models import Message
from .serializers import MessageSerializer
from .permissions import IsAuthOrReadOnly


class MessageListAPIView(generics.ListCreateAPIView):
      queryset = Message.objects.all().order_by('-updated_at')
      serializer_class = MessageSerializer
      permission_classes = (IsAuthOrReadOnly,)

      def perform_create(self, serializer):
          serializer.save(user=self.request.user)

class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

      # def sample_view(request):
      #     current_user = request.user
      #     print current_user.id
