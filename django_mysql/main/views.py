from django.shortcuts import render
from django.views import View

class Index(View):
    def get(self, request):
        return render(request, 'main/index.html')
    
class Regulation(View):
    def get(self, request):
        return render(request, 'main/regulation.html')
    
class Login(View):
    def get(self, request):
        return render(request, 'main/login.html')