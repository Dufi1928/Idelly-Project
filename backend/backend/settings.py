from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-drki4#-@me1=)8a_uvnke(ocyp4ihf3m*81!rf4ra8h#d51k34'

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ORIGIN_WHITELIST = [
    'https://mygameon.pro:433',
    'http://mygameon.pro:80',
    'http://localhost:3000',
    'https://mygameon.pro:5173',
    'http://mygameon.pro:5173',
]
CORS_ALLOWED_ORIGINS = [
    "https://mygameon.pro",
    'https://localhost:*',
]


INSTALLED_APPS = [
    'users',
    'patients',
    'sslserver',
    'corsheaders',
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
]

STATIC_URL = '/static/'

ASGI_APPLICATION = 'backend.routing.application'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

SSL_CERTIFICATE = "/etc/letsencrypt/live/mygameon.pro/fullchain.pem"
SSL_PRIVATE_KEY = "/etc/letsencrypt/live/mygameon.pro/privkey.pem"


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'idelly',
        'USER': 'ivan',
        'PASSWORD': '040998Ih@',
        'HOST': '31.220.57.164',
        'PORT': '5432',
        'TEST': {
            'NAME': 'test_gameon',
        },
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
APPEND_SLASH = False
AUTH_USER_MODEL = 'users.User'
SESSION_COOKIE_NAME = 'jwt'
CSRF_COOKIE_NAME = 'csrftoken'

CORS_ALLOW_CREDENTIALS = True


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('31.220.57.164', 6379)],
        },
    },
}
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


