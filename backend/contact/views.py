from django.shortcuts import render
from django.http import JsonResponse
from .models import Contact
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        # Recover the json data
        data = json.loads(request.body)

        # extract form data from json
        name = data.get('name')
        email = data.get('email')
        topic = data.get('topic')
        message = data.get('message')

        # Validate form data
        if not name or not email or not topic or not message:
            return JsonResponse({'error': 'Tous les champs sont obligatoires.'}, status=400)

        # create an instance of Contact model with form data
        contact = Contact.objects.create(name=name, email=email, topic=topic, message=message)

        # answer to the request with a json success message
        return JsonResponse({'success': True})

    return JsonResponse({'error': 'Only POST requests are allowed'})
