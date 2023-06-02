from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# View for dashboard page, available to everyone to look at disponibility
class Rental(View):
    def get(self, request):
        return render(request, 'rental/rental.html')
    
# View for scholar page related to the rental app, Scholars should only be able to look at disponibility, games and logs
class Scholar(View):
    def get(self, request):
        return render(request, 'rental/scholar.html')

# View for admin page related to the rental app, CRUD operations for games, users, logs and statistics
class Admin(View):
    def get(self, request):
        return render(request, 'rental/admin.html')
    
# View for biometrics page, where the user is registered through face recognition API
@csrf_exempt
def biometricsAPI(request):
    if request.method == 'POST':
        return JsonResponse({'status': 'success'})