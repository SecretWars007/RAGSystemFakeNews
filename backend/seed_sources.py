import os
import sys
from uuid import uuid4
from datetime import datetime, timezone

# Set up path to allow importing app modules
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.models.trusted_source_model import TrustedSourceModel

def seed_sources():
    session = SessionLocal()
    
    sources_data = [
        {"name": "BBC Mundo", "url": "https://www.bbc.com/mundo"},
        {"name": "CNN en Español", "url": "https://cnnespanol.cnn.com/"},
        {"name": "El País", "url": "https://elpais.com/america/"},
        {"name": "Infobae", "url": "https://www.infobae.com/"},
        {"name": "Reuters Latam", "url": "https://www.reuters.com/latam/"},
        {"name": "DW Español", "url": "https://www.dw.com/es/actualidad/s-30684"},
        {"name": "France 24 Español", "url": "https://www.france24.com/es/"},
        {"name": "Agencia EFE", "url": "https://efe.com/"},
        {"name": "Associated Press (AP) Noticias", "url": "https://apnews.com/hub/noticias"},
        {"name": "Los Tiempos (Bolivia)", "url": "https://www.lostiempos.com/"},
        {"name": "El Deber (Bolivia)", "url": "https://eldeber.com.bo/"}
    ]
    
    try:
        for idx, src in enumerate(sources_data):
            source = TrustedSourceModel(
                id=uuid4(),
                name=src["name"],
                base_url=src["url"],
                source_type="news_media",
                priority=100,
                crawl_interval_minutes=1440,
                extraction_config="{}",
                is_active=True,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            session.add(source)
            print(f"Added source: {src['name']}")
        
        session.commit()
        print(f"Successfully seeded {len(sources_data)} trusted sources!")
        
    except Exception as e:
        session.rollback()
        print(f"Error seeding sources: {e}")
    finally:
        session.close()

if __name__ == '__main__':
    seed_sources()
