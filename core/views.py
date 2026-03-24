from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.utils import DatabaseError
from .models import Project
from .forms import ContactForm

def index(request):
    try:
        projects = Project.objects.filter(is_visible=True)
    except DatabaseError:
        projects = []
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                messages.success(request, 'Thank you! Your message has been sent.')
                return redirect('home')
            except DatabaseError:
                messages.error(request, 'Message service is temporarily unavailable. Please try again later.')
    else:
        form = ContactForm()

    context = {
        'projects': projects,
        'form': form,
    }
    return render(request, 'core/index.html', context)
