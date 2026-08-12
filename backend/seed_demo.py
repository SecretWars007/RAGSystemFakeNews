import os
import sys
from uuid import uuid4
from datetime import datetime, timezone

# Set up path to allow importing app modules
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.repositories.postgres_news_repository import PostgresNewsRepository
from app.infrastructure.repositories.embedding_repository import PostgresEmbeddingRepository
from app.application.services.news_service import NewsService
from app.application.services.embedding_service import EmbeddingService
from app.domain.entities.news import News
from app.domain.entities.embedding import Embedding
from app.infrastructure.ai.gemini_embedding import get_embedding_model

def seed_demo_data():
    session = SessionLocal()
    
    try:
        news_repo = PostgresNewsRepository(session)
        news_service = NewsService(news_repo)
        
        embed_repo = PostgresEmbeddingRepository(session)
        embed_service = EmbeddingService(embed_repo)
        
        # 1. Create a dummy news article refuting the "2 Bs" claim
        news_id = uuid4()
        news = News(
            id=news_id,
            title="El dólar en Bolivia se cotiza entre 6.96 y 15 Bolivianos, descartando una caída a 2 Bs",
            content="El Banco Central de Bolivia mantiene el tipo de cambio oficial en 6.96 Bolivianos para la venta. Sin embargo, debido a la escasez de dólares, en el mercado paralelo la divisa se cotiza entre 10 y 15 Bolivianos dependiendo de la región. Recientes rumores en redes sociales que afirman que el dólar bajó a 2 Bolivianos son completamente falsos y carecen de sustento económico. Autoridades recomiendan informarse por canales oficiales.",
            source="Banco Central de Bolivia (BCB) / Reporte Económico",
            author="Economía Digital",
            url="https://bcb.gob.bo/reporte-dolar-falso",
            language="es",
            country="Bolivia",
            published_at=datetime.now(timezone.utc),
            is_fake=False,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        # Save news
        news_service.create(news)
        print(f"Noticia guardada con ID: {news_id}")
        
        # 2. Generate embedding
        print("Generando embedding con Gemini...")
        embedding_model = get_embedding_model()
        vector = embedding_model.generate(news.content)
        
        # 3. Save embedding
        embedding = Embedding(
            id=uuid4(),
            news_id=news_id,
            provider="google",
            model="models/gemini-embedding-001",
            dimensions=len(vector),
            vector=vector,
            created_at=datetime.now(timezone.utc)
        )
        
        embed_service.save(embedding)
        print(f"Embedding guardado con ID: {embedding.id} ({len(vector)} dimensiones)")
        
        session.commit()
        print("Base de datos actualizada exitosamente para la demo!")
        
    except Exception as e:
        session.rollback()
        print(f"Error al sembrar datos: {e}")
    finally:
        session.close()

if __name__ == '__main__':
    seed_demo_data()
