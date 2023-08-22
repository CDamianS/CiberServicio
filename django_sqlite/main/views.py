from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from rental.models import Game, Plays

# Views for Index Page
class Index(View):
    def get(self, request):
        games = Game.objects.filter(show=True).values('id', 'name', 'displayName', 'available')
        for game in games:

            plays = Plays.objects.filter(game__name=game['name'], ended=False)
            game_data_list = []

            for play in plays:
                student_id = play.student.id
                play_time = play.time

                play_data = {
                    'student_id': student_id,
                    'start_time': play_time
                }

                game_data_list.append(play_data)

            game['plays_data'] = game_data_list

        context = {
            'games': games
        }

        return render(request, 'main/index.html', context=context)
    
class Regulations(View):
    def get(self, request):
        return render(request, 'main/regulations.html')
    
class Login(View):
    def get(self, request):
        return render(request, 'main/login.html')
    
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        next_url = request.GET.get('next')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to dashboard or next_url
            if next_url:
                return redirect(next_url)
            else:
                return redirect('/')
        else:
            return render(request, 'main/login.html', context={'error_message': "Invalid username or password"})
        
def logout(request):
    logout(request)
    return redirect('/')