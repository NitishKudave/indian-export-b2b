#!/usr/bin/env bash
# Force rebuild: 2026-09-07
# exit on error
set -o errexit

pip install -r requirements.txt
python manage.py migrate

# Create or update superuser from environment variables
python manage.py shell -c "
from django.contrib.auth.models import User
import os
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@orbinexglobal.com')
if password:
    user, created = User.objects.get_or_create(username=username, defaults={'email': email, 'is_staff': True, 'is_superuser': True})
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print(f'Superuser {username} {\"created\" if created else \"updated\"} successfully.')
else:
    print('No DJANGO_SUPERUSER_PASSWORD set, skipping superuser update.')
"
