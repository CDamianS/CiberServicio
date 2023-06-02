from django.shortcuts import render
from django.views import View

class Index(View):
    def get(self, request):
        return render(request, 'main/index.html')
    
class Regulations(View):
    def get(self, request):
        return render(request, 'main/regulations.html')
    
class Login(View):
    def get(self, request):
        return render(request, 'main/login.html')