# Magic Eight Ball

A simple Magic 8-Ball app demonstrating many of the basic features of Python, Django and Javascript/jQuery. 

### Description:

This app talks to the Magic 8-Ball API at https://8ball.delegator.com/ and randomly generates Magic 8-Ball responses to yes/no questions. It uses Python 3 and Django 2.0.6, as well as standard HTML5, CSS3 and Javascript/jQuery for front end design. The following extra features have been added to demonstrate the power of Django and Python:

- Authentication and authorization with user registration, login/logout, password resets and a simple profile page
	- Note: Password resets log the reset email to the console
	- An email authentication backend has been written to allow either username or email authentication
- Design methodology is mobile-first, so it is responsive across multiple screen layouts
- Local browser storage is used to store API response history data
- Response history data is persistent between refreshes, browser restarts, and even user login/logout (try creating multiple users and logging in/out - it will remember your response history until you clear it!)
- A nav menu and footer have been added, providing navigation throughout the site and a link to my personal Github
- Django template inheritance, template tagging and form validation has been used throughout the site
- Some crude Javascript data cleansing has been implemented on the question submission form to prevent some CORS violations

### Requirements:

- Python 3.x
- Django 2.x
- Pip (to install requirements)
- (Optional) Virtualenv or some other virtual environment management tool if you want to run it in a venv

### Setup/Usage:

- (Optional) Create a virtual environment
- Download or clone this repo
- Install requirements: `pip install -r requirements.txt`
- Make migrations: `python manage.py makemigrations`
- Migrate changes: `python manage.py migrate`
- (Optional) Create a superuser: `python manage.py createsuperuser` and follow the prompts
- Run the local development server: `python manage.py runserver` (**IMPORTANT:** see notes below)
- Navigate to http://127.0.0.1:21337 - you will be redirected to the login page
- If you created a superuser above, you can use your superuser to log in 
- (Optional) If you opted not to create a superuser, register for an account and you will be automatically logged in with your new standard user

### Important Notes:

- The local development server runs on port 21337. For convenience, manage.py has been modified so it will start there automatically. If for some reason this does not work, comment out lines 9-15 in `manage.py` and start the server with `python manage.py runserver <desired port>`
- For convenience, this project automatically generates a secret key in `<YOUR_SETTINGS_DIRECTORY>/secret_key.py` for you when you run the development server for the first time. If you plan to launch the app in production, please refer to the [Django Deployment Checklist](https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/) for how to properly handle your `SECRET_KEY`.
- Due to the above, you must have **write access** to your settings directory in order to generate the secret key. If you prefer to set it yourself, simply remove lines 17-25 in `settings.py` and replace them with `SECRET_KEY = <your secret key>`