import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import plotly.express as px
import plotly.io as pio

class AnalyzeDataView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.data['file']
        try:
            if file_obj.name.endswith('.csv'):
                df = pd.read_csv(file_obj)
            elif file_obj.name.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file_obj)
            else:
                return Response({'error': 'Unsupported file type'}, status=400)

            # Basic Analysis
            rows = len(df)
            columns = list(df.columns)
            missing_values = df.isnull().sum().to_dict()
            stats = df.describe().to_dict()

            # Generate Charts
            charts = {}
            numeric_cols = df.select_dtypes(include=['number']).columns
            if len(numeric_cols) > 1:
                corr_matrix = df[numeric_cols].corr()
                fig_corr = px.imshow(corr_matrix, text_auto=True)
                charts['correlation'] = pio.to_json(fig_corr)

            if len(numeric_cols) > 0:
                fig_hist = px.histogram(df, x=numeric_cols[0])
                charts['histogram'] = pio.to_json(fig_hist)

            return Response({
                'rows': rows,
                'columns': columns,
                'missing_values': missing_values,
                'stats': stats,
                'charts': charts,
            })
        except Exception as e:
            return Response({'error': str(e)}, status=500)