from django.urls import path

from .views import EmissionSummaryView, EmissionRecordListView


urlpatterns = [
    path(
        'summary/',
        EmissionSummaryView.as_view(),
        name='emission-summary'
    ),
    path(
        'records/',
        EmissionRecordListView.as_view(),
        name='emission-records'
    ),
]