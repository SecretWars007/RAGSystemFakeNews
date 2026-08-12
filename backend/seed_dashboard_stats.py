import os
import sys
import secrets
from uuid import uuid4
from datetime import datetime, timezone, timedelta

# Set up path to allow importing app modules
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.models.news_model import NewsModel
from sqlalchemy import text

def generate_fake_data():
    session = SessionLocal()
    
    # Check how many exist currently
    verified_count = session.query(NewsModel).filter(NewsModel.is_fake == False).count()
    fake_count = session.query(NewsModel).filter(NewsModel.is_fake == True).count()
    
    needed_verified = max(0, 301 - verified_count)
    needed_fake = max(0, 214 - fake_count)
    
    news_items = []
    
    if needed_verified > 0:
        print(f"Generando {needed_verified} noticias verificadas (reales)...")
        for i in range(needed_verified):
            news = NewsModel(
                id=uuid4(),
                title=f"Noticia verificada y confirmada sobre economía/sociedad #{i+1}",
                content="Esta es una noticia real obtenida de fuentes confiables que ha pasado todos los filtros de verificación del sistema RAG. Contiene datos precisos, fechas contrastadas y ha sido validada mediante múltiples fuentes independientes y modelos de lenguaje.",
                source="Medio Confiable " + str(secrets.randbelow(5) + 1),
                author="Periodista Verificado",
                url=f"https://noticias-reales.com/noticia-{i}",
                language="es",
                country="Bolivia",
                published_at=datetime.now(timezone.utc) - timedelta(days=secrets.randbelow(30) + 1),
                is_fake=False,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            news_items.append(news)
            
    if needed_fake > 0:
        print(f"Generando {needed_fake} noticias falsas (bulos)...")
        for i in range(needed_fake):
            news = NewsModel(
                id=uuid4(),
                title=f"Bulo detectado en redes sociales (Posible Fake News) #{i+1}",
                content="Esta información fue detectada como potencialmente falsa por nuestro modelo local y contrastada con la base vectorial, confirmándose su falsedad. No existen fuentes creíbles que la respalden y parece haber sido generada para desinformar a la población.",
                source="Cadena de WhatsApp / X",
                author="Anónimo",
                url=f"https://redes-sociales.com/post-{i}",
                language="es",
                country="Bolivia",
                published_at=datetime.now(timezone.utc) - timedelta(days=secrets.randbelow(30) + 1),
                is_fake=True,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            news_items.append(news)
        
    if not news_items:
        print("La base de datos ya tiene al menos 301 noticias reales y 214 falsas.")
        return

    try:
        session.bulk_save_objects(news_items)
        session.commit()
        print("¡Éxito! Se insertaron los registros necesarios.")
    except Exception as e:
        session.rollback()
        print(f"Error seeding news: {e}")
    finally:
        session.close()

if __name__ == '__main__':
    generate_fake_data()
