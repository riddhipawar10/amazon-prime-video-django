from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from .forms import MovieForm
from .models import Movie

@login_required
def home(request):
    movies = Movie.objects.all()
    featured = movies.first()
    categories = [
        ('Trending Now', movies[:10]),
        ('Amazon Originals & Exclusives', movies.filter(genre__icontains='Hollywood')[:10]),
        ('Indian Movies', movies.filter(genre__icontains='Indian')[:10]),
        ('Action & Adventure', movies.filter(genre__icontains='Action')[:10]),
        ('Comedy & Drama', movies.filter(genre__icontains='Comedy')[:10]),
    ]
    categories = [(name, items) for name, items in categories if items]
    return render(request, 'home.html', {'movies': movies, 'featured': featured, 'categories': categories})

@login_required
def addMovie(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = MovieForm()
    return render(request, 'add_movie.html', {'form': form, 'title': 'Add title'})

@login_required
def manageMovies(request):
    movies = Movie.objects.all()
    return render(request, 'manage_movies.html', {'movies': movies})

@login_required
def editMovie(request, pk):
    movie = get_object_or_404(Movie, id=pk)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect('manage_movies')
    else:
        form = MovieForm(instance=movie)
    return render(request, 'add_movie.html', {'form': form, 'title': 'Edit title', 'movie': movie})

@login_required
def deleteMovie(request, pk):
    movie = get_object_or_404(Movie, id=pk)
    if request.method == 'POST':
        movie.delete()
        return redirect('manage_movies')
    return render(request, 'delete_movie.html', {'movie': movie})
