from django.db import models
from django.contrib.auth.models import User

from organizations.models import Organization


class DataSource(models.Model):

    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    uploaded_file = models.FileField(
        upload_to='uploads/'
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    status = models.CharField(
        max_length=20,
        default='PENDING'
    )

    def __str__(self):
        return f"{self.organization.name} - {self.source_type}"


class RawRecord(models.Model):

    PARSE_STATUS = [
        ('SUCCESS', 'SUCCESS'),
        ('FAILED', 'FAILED'),
    ]

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE,
        related_name='raw_records'
    )

    raw_payload = models.JSONField()

    parse_status = models.CharField(
        max_length=20,
        choices=PARSE_STATUS,
        default='SUCCESS'
    )

    error_message = models.TextField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"RawRecord {self.id}"