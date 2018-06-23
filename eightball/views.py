from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    '''Return the 8-ball index page'''
    
    return render(request, 'eightball.html')
