from django.urls import path

from .views import ReviewEmissionRecordView


urlpatterns = [
    path(
        'review/<int:record_id>/',
        ReviewEmissionRecordView.as_view(),
        name='review-record'
    ),
]