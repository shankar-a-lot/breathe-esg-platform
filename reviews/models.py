from django.db import models
from django.contrib.auth.models import User

from normalization.models import EmissionRecord


class ReviewAction(models.Model):

    ACTION_CHOICES = [
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    reviewer = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    comment = models.TextField(
        null=True,
        blank=True
    )

    reviewed_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.record.id} - {self.action}"