from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .serializers import PatientSerializer
from django.http import JsonResponse
from django.conf import settings
from django.views import View
from .models import Patient
from datetime import datetime
import json
import jwt

def decode_jwt(token):
    try:
        # Remplacez 'your_secret_key' par la clé secrète utilisée pour signer le JWT.
        decoded_payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded_payload['id']  # Ceci est le payload décodé du JWT
    except jwt.ExpiredSignatureError:
        return "bob"
    except jwt.InvalidTokenError:
        return "marley"

@method_decorator(csrf_exempt, name='dispatch')
class GetPatients(View):
    def post(self, request, *args, **kwargs):
        print("Request Body: ", request.body)
        data = json.loads(request.body)
        token = data.get('token')
        user_id = decode_jwt(token)

        if not user_id:
            return JsonResponse({"error": "userId est requis" + user_id}, status=400)

        try:
            User = get_user_model()
            user = User.objects.get(pk=user_id)
            patients = user.patients.all()

            serializer = PatientSerializer(patients, many=True)

            return JsonResponse(serializer.data, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)



@method_decorator(csrf_exempt, name='dispatch')
class CreatePatients(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        token = data.get('token')
        user_id = decode_jwt(token)

        if not user_id:
            return JsonResponse({"error": "userId est requis"}, status=400)

        name = data.get('name')
        surname = data.get('surname')
        gender = data.get('gender')
        date_of_birth = data.get('date_of_birth')
        phone_number = data.get('phone_number')
        address = data.get('address')
        additional_info = data.get('additional_info')
        treating_doctor = data.get('treating_doctor')
        pharmacy = data.get('pharmacy')
        other_contact = data.get('other_contact')
        social_security_number = data.get('socialSecurityNumber')

        # Validation des données
        required_fields = {
            'name': name,
            'surname': surname,
            'gender': gender,
            'date_of_birth': date_of_birth,
            'phone_number': phone_number,
            'address': address,
            'treating_doctor': treating_doctor,
            'pharmacy': pharmacy,
            'social_security_number': social_security_number
        }

        missing_fields = [field for field, value in required_fields.items() if value is None]

        if missing_fields:
            return JsonResponse({
                "error": f"Les champs suivants sont manquants : {', '.join(missing_fields)}. Date de naissance: {date_of_birth}"},
                status=400)

        try:
            User = get_user_model()
            user = User.objects.get(pk=user_id)

            # Création du nouveau patient
            patient = Patient.objects.create(
                name=name,
                surname=surname,
                gender=gender,
                date_of_birth=date_of_birth,
                phone_number=phone_number,
                address=address,
                additional_info=additional_info,
                treating_doctor=treating_doctor,
                pharmacy=pharmacy,
                other_contact=other_contact,
                social_security_number=social_security_number
            )

            # Lier le patient à l'utilisateur
            patient.users.add(user)

            serializer = PatientSerializer(patient)
            return JsonResponse(serializer.data, safe=False, status=201)


        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class DeletePatient(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        token = data.get('token')
        patient_id = data.get('patient_id')
        user_id = decode_jwt(token)
        print(patient_id)
        print(user_id)

        if not user_id:
            return JsonResponse({"error": "userId est requis"}, status=400)

        if not patient_id:
            return JsonResponse({"error": "patientId est requis"}, status=400)

        try:
            patient = Patient.objects.get(pk=patient_id)
            user = get_user_model().objects.get(pk=user_id)

            if patient.users.count() == 1 and patient.users.first().id == user.id:
                # Si le patient appartient à cet utilisateur uniquement, supprimez-le.
                patient.delete()
            else:
                # Sinon, supprimez seulement la relation entre cet utilisateur et le patient.
                patient.users.remove(user)

            return JsonResponse({"success": "Patient supprimé ou désassocié avec succès."}, status=200)

        except Patient.DoesNotExist:
            return JsonResponse({"error": "Ce patient n'existe pas."}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)