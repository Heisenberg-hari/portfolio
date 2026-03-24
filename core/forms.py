from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Name',
                'id': 'contact-name',
                'autocomplete': 'name',
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'your@email.com',
                'id': 'contact-email',
                'autocomplete': 'email',
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Your message...',
                'rows': 5,
                'id': 'contact-message',
            }),
        }
