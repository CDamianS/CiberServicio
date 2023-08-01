from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from .models import Student, Plays, Game, Sanction, Log
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# View for admin page related to the rental app, CRUD operations for games, users, logs and statistics
class Admin(View):
    def get(self, request):
        # add to the context all students, games, logs and sanctions
        context = {
            'students': Student.objects.all(),
            'plays': Plays.objects.all(),
            'games': Game.objects.all(),
            'logs': Log.objects.all(),
            'sanctions': Sanction.objects.all(),
            
        }
        return render(request, 'rental/admin.html', context=context)
    
# View for biometrics page, where the user is registered through face recognition API
@csrf_exempt
def biometricsAPI(request):
    if request.method == 'POST':
        return JsonResponse({'status': 'success'})