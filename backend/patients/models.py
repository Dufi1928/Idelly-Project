from django.db import models
from django.conf import settings


class Patient(models.Model):
    social_security_number = models.CharField(max_length=13, unique=True, verbose_name="Social Security Number")
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, verbose_name="Gender")
    date_of_birth = models.DateField(verbose_name="Date of Birth")
    phone_number = models.CharField(max_length=15, verbose_name="Phone Number")
    address = models.TextField(verbose_name="Address")
    additional_info = models.TextField(null=True, blank=True, verbose_name="Additional Information")
    treating_doctor = models.CharField(max_length=255, verbose_name="Treating Doctor")
    pharmacy = models.CharField(max_length=255, verbose_name="Pharmacy")
    other_contact = models.TextField(null=True, blank=True, verbose_name="Other Contact")
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='patients', verbose_name="Users")
    def __str__(self):
        return self.social_security_number
