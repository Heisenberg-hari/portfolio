from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project
from .forms import ContactForm

def index(request):
    projects = Project.objects.filter(is_visible=True)
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you! Your message has been sent.')
            return redirect('home')
    else:
        form = ContactForm()

    context = {
        'projects': projects,
        'form': form,
    }
    return render(request, 'core/index.html', context)
