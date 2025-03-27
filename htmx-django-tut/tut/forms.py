from django import forms

class SampleForm(forms.Form):
    name = forms.CharField(min_length=3, max_length=100)
    email = forms.EmailField()
    favourite_color = forms.CharField(widget=forms.TextInput(attrs={'type': 'color'})) 
