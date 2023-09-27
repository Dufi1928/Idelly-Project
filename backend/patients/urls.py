from django.urls import path
from .views import GetPatients, CreatePatients, DeletePatient,ModifyPatient,GetSinglePatient

urlpatterns = [
    path('Patients', GetPatients.as_view()),
    path('CreatePatients', CreatePatients.as_view()),
    path('delete_patient', DeletePatient.as_view()),
    path('modify_patient', ModifyPatient.as_view()),
    path('get_single_patient', GetSinglePatient.as_view()),
]
