import csv
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import DataSource, RawRecord
from organizations.models import Organization

from django.contrib.auth.models import User


class UploadDataSourceView(APIView):

    def post(self, request):

        uploaded_file = request.FILES.get('file')

        source_type = request.data.get('source_type')

        organization_id = request.data.get('organization_id')

        if not uploaded_file:
            return Response(
                {"error": "File is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        organization = Organization.objects.get(
            id=organization_id
        )

        user = User.objects.first()

        datasource = DataSource.objects.create(
            organization=organization,
            source_type=source_type,
            uploaded_file=uploaded_file,
            uploaded_by=user
        )

        # CSV Handling
        if uploaded_file.name.endswith('.csv'):

            decoded_file = uploaded_file.read().decode('utf-8').splitlines()

            reader = csv.DictReader(decoded_file)

            for row in reader:

                RawRecord.objects.create(
                    source=datasource,
                    raw_payload=row,
                    parse_status='SUCCESS'
                )

        # JSON Handling
        elif uploaded_file.name.endswith('.json'):

            data = json.load(uploaded_file)

            for row in data:

                RawRecord.objects.create(
                    source=datasource,
                    raw_payload=row,
                    parse_status='SUCCESS'
                )

        else:
            return Response(
                {"error": "Unsupported file type"},
                status=status.HTTP_400_BAD_REQUEST
            )

        datasource.status = 'COMPLETED'
        datasource.save()

        return Response(
            {
                "message": "File uploaded successfully"
            },
            status=status.HTTP_201_CREATED
        )