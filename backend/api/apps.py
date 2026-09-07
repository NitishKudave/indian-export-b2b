import os
from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        if password:
            try:
                from django.contrib.auth.models import User
                username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
                user, created = User.objects.get_or_create(
                    username=username,
                    defaults={'email': f'{username}@orbinexglobal.com'}
                )
                user.is_staff = True
                user.is_superuser = True
                user.is_active = True
                user.set_password(password)
                user.save()
                print(f"[AUTH] Superuser '{username}' password synced from environment.")
            except Exception:
                pass

