#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mpg_eightball.settings")

    # Override default port for `runserver` command
    try:
        import django
        django.setup()
        from django.core.management.commands.runserver import Command as runserver
        runserver.default_port = "21337"
    except Exception as e:
        print('\nWarning: Exception occurred while trying to override the default port for runserver. Defaulting to 8000. You can override it manually with \'python manage.py runserver <port>\'\n\nException: {}'.format(e))

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
