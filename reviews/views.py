from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User

from normalization.models import EmissionRecord
from .models import ReviewAction


class ReviewEmissionRecordView(APIView):

    def post(self, request, record_id):

        action = request.data.get('action')

        comment = request.data.get('comment')

        try:
            record = EmissionRecord.objects.get(id=record_id)

        except EmissionRecord.DoesNotExist:

            return Response(
                {"error": "Record not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        reviewer = User.objects.first()

        ReviewAction.objects.create(
            record=record,
            reviewer=reviewer,
            action=action,
            comment=comment
        )

        if action.upper() == 'APPROVED':
            record.status = 'APPROVED'

        elif action.upper() == 'REJECTED':
            record.status = 'REJECTED'

        record.save()

        return Response({
            "message": f"Record {action.lower()} successfully"
        })