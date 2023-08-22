# Views (Logic) for API calls.
from django.http import JsonResponse
from rental.models import Game, Plays, Student

def get_start_times(request):
    try:
        games = Game.objects.filter(show=True).values('start_time')
        data = []
        for game in games:
            formatted_time = game['start_time'].strftime('%b %d, %Y %H:%M:%S')
            data.append({'time': formatted_time})
            print(formatted_time)
        return JsonResponse(data, safe=False)
    except:
        return JsonResponse({'status': 'error'})
    
def set_play_ended(request):
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        try:
            play = Plays.objects.filter(student__id=student_id).latest('time')
            play.ended = True
            play.save()
            return JsonResponse({'status': 'success'})
        except Plays.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Play not found'})
        
def add_student_to_game(request):
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        game_id = request.POST.get('game_id')
        try:
            game = Game.objects.get(id=game_id)
            student = Student.objects.get(id=student_id)
            play = Plays.objects.create(game=game, student=student)
            play.save()
            return JsonResponse({'status': 'success'})
        except Game.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Game not found'})