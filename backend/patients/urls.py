from django.urls import path
from .views import GetPatients, CreatePatients, DeletePatient

urlpatterns = [
    path('Patients', GetPatients.as_view()),
    path('CreatePatients', CreatePatients.as_view()),
    path('delete_patient', DeletePatient.as_view()),
]
