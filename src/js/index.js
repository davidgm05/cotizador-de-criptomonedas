
import '../scss/style.scss';

document.addEventListener("DOMContentLoaded", async function() {
  const apiKey = '87fef08eba6347379394561770e13cd4';
  const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      
      const newsContainer = document.getElementById('news-container'); // Obtener el contenedor donde se mostrarán las noticias
      
      
      data.articles.forEach(article => {
          // Crear un h2 para el título de la noticia
          const divElement = document.createElement('div')
          divElement.className = 'contentBox';
          const titleElement = document.createElement('h2');
          titleElement.className = 'title';
          titleElement.textContent = article.title;
          
          // Agregar el h2 al contenedor de noticias
          divElement.appendChild(titleElement);
          newsContainer.appendChild(divElement);
      });
  } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
  }
});


  

