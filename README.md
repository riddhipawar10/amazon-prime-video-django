# Amazon Prime Video Clone — Django Assignment

A Prime Video-style Django project converted from the supplied Netflix assignment. It keeps the original concepts: Django authentication, models, ModelForms, CRUD operations, templates, URL routing, JavaScript search, modal details, and YouTube trailers, while changing the UI to a Prime Video-inspired dark/blue interface.

## Features
- Prime Video-style responsive home page
- Login, signup and logout using Django authentication
- Movie catalog stored in SQLite
- 30 sample movies loaded through a Django fixture
- Search by title, genre and director using JavaScript DOM events
- Movie detail modal with trailer iframe
- Add / edit / delete titles
- Django admin
- Client-side watchlist using localStorage
- Horizontal movie rows and responsive layout

## Quick start (Windows / VS Code / CMD)

```bat
cd path\to\amazon_prime_video
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata movies
python manage.py createsuperuser
python manage.py runserver
```

Open http://127.0.0.1:8000/ and create/login with an account.

Admin: http://127.0.0.1:8000/admin/

If `python` does not work on Windows, try `py` instead.
