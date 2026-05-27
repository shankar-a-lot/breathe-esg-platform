from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import EmissionRecord
from .serializers import EmissionRecordSerializer

class EmissionSummaryView(APIView):

    def get(self, request):

        total_emissions = sum(
            record.co2e
            for record in EmissionRecord.objects.all()
        )

        total_records = EmissionRecord.objects.count()

        flagged_records = EmissionRecord.objects.filter(
            is_flagged=True
        ).count()

        return Response({
            "total_emissions": total_emissions,
            "total_records": total_records,
            "flagged_records": flagged_records,
        })
class EmissionRecordListView(ListAPIView):

    queryset = EmissionRecord.objects.all()

    serializer_class = EmissionRecordSerializer
