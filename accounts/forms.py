from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError

class UserLoginForm(forms.Form):
    '''Form to be used to log users in'''
    
    username = forms.CharField(label="Username or Email")
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        # Disable autocomplete on all fields and auto-focus on the username field
        super(UserLoginForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'autofocus': '', 'autocomplete': 'off'})
        self.fields['password'].widget.attrs.update({'autocomplete': 'off'})
    
class UserRegistrationForm(UserCreationForm):
    '''Form used to register a new user'''
    
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Password Confirmation", widget=forms.PasswordInput)
        
    class Meta:
        model = User
        fields = ['email', 'username', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        # Disable autocomplete on all fields and auto-focus on the email field
        super(UserCreationForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'autofocus': '', 'autocomplete': 'off'})
        self.fields['username'].widget.attrs.update({'autocomplete': 'off'})
        self.fields['password1'].widget.attrs.update({'autocomplete': 'off'})
        self.fields['password2'].widget.attrs.update({'autocomplete': 'off'})
        
    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        
        if User.objects.filter(email=email).exclude(username=username):
            raise ValidationError(u'Email address must be unique')
        return email
        
    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        
        if not password1 or not password2:
            raise ValidationError('Please fill your password out twice to confirm it.')
            
        if password1 != password2:
            raise ValidationError('Passwords do not match')
            
        return password2
        