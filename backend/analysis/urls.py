from django.urls import path
from .views import AnalyzeDataView

urlpatterns = [
    path('analyze-data/', AnalyzeDataView.as_view(), name='analyze_data'),
]