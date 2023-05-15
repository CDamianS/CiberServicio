from django.shortcuts import render
from django.views import View

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