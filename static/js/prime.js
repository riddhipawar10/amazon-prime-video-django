let activeMovieId = null;
function showMovie(card){ showMovieFromId(card.dataset.id); }
function showMovieFromId(id){
  const m = movies[String(id)];
  if(!m) return;
  activeMovieId = String(id);
  document.getElementById('modalName').textContent=m.name;
  document.getElementById('modalYear').textContent=m.year;
  document.getElementById('modalDuration').textContent=m.duration;
  document.getElementById('modalRating').textContent='IMDb '+m.rating.replace('/10','');
  document.getElementById('modalGenre').textContent=m.genre;
  document.getElementById('modalDirector').textContent=m.director;
  document.getElementById('modalCast').textContent=m.cast;
  document.getElementById('modalDescription').textContent=m.description;
  document.getElementById('trailerFrame').src=m.trailer+'?autoplay=1';
  updateWatchlistButton();
  document.getElementById('movieModal').style.display='block';
  document.body.style.overflow='hidden';
}
function closeMovie(){
  document.getElementById('movieModal').style.display='none';
  document.getElementById('trailerFrame').src='';
  document.body.style.overflow='auto';
}
function closeOnBackdrop(e){ if(e.target.id==='movieModal') closeMovie(); }
function searchMovies(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  const cards=document.querySelectorAll('.movie-card');
  let visible=0;
  cards.forEach(card=>{
    const match=!q || card.dataset.name.includes(q) || card.dataset.genre.includes(q) || card.dataset.director.includes(q);
    card.style.display=match?'block':'none'; if(match) visible++;
  });
  document.querySelectorAll('.row-section').forEach(row=>{
    const has=[...row.querySelectorAll('.movie-card')].some(c=>c.style.display!=='none');
    row.style.display=has?'block':'none';
  });
  document.getElementById('noResults').style.display=(q && visible===0)?'block':'none';
}
function scrollRow(btn,direction){ const row=btn.parentElement.nextElementSibling; row.scrollBy({left:direction*700,behavior:'smooth'}); }
function getWatchlist(){ return JSON.parse(localStorage.getItem('primeWatchlist')||'[]'); }
function toggleWatchlist(){
  let list=getWatchlist();
  if(list.includes(activeMovieId)) list=list.filter(id=>id!==activeMovieId); else list.push(activeMovieId);
  localStorage.setItem('primeWatchlist',JSON.stringify(list)); updateWatchlistButton();
}
function updateWatchlistButton(){
  const btn=document.getElementById('watchlistBtn'); if(!btn) return;
  btn.textContent=getWatchlist().includes(activeMovieId)?'✓ Added to Watchlist':'＋ Add to Watchlist';
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMovie(); if(e.key==='Enter' && document.activeElement.id==='searchInput') searchMovies(); });
