from django.contrib import admin
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('name', 'genre', 'releaseYear', 'rating')
    search_fields = ('name', 'genre', 'director', 'cast')
    list_filter = ('releaseYear',)
