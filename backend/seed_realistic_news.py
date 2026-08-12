import os
import sys
import secrets
from uuid import uuid4
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.models.news_model import NewsModel
from sqlalchemy import text

REAL_NEWS_TEMPLATES = [
    {
        "title": "El BCB reporta incremento en las Reservas Internacionales Netas en el último trimestre",
        "content": "El Banco Central de Bolivia (BCB) informó que las Reservas Internacionales Netas (RIN) registraron un ligero incremento al cierre del último trimestre, alcanzando los 1.796 millones de dólares. Según el reporte oficial, este aumento se debe principalmente a las exportaciones tradicionales y la compra de oro interno.",
        "source": "Agencia Boliviana de Información (ABI)",
        "author": "Redacción Central"
    },
    {
        "title": "Gobierno y empresarios acuerdan nuevas medidas para incentivar la exportación",
        "content": "Representantes del Gobierno nacional y la Confederación de Empresarios Privados de Bolivia (CEPB) firmaron un acuerdo de 10 puntos para agilizar los trámites de exportación, buscando inyectar mayor liquidez en dólares al mercado nacional y reducir la brecha cambiaria.",
        "source": "La Razón",
        "author": "Ministerio de Economía"
    },
    {
        "title": "YPFB anuncia el hallazgo de un nuevo pozo gasífero en el sur del país",
        "content": "Yacimientos Petrolíferos Fiscales Bolivianos (YPFB) confirmó el descubrimiento de un nuevo reservorio de gas natural en el departamento de Tarija, el cual aportará aproximadamente 1.2 millones de metros cúbicos diarios (MMmcd) al sistema de producción nacional.",
        "source": "El Deber",
        "author": "Corresponsal"
    },
    {
        "title": "ASFI asegura que el sistema financiero se mantiene sólido frente a la volatilidad",
        "content": "La Autoridad de Supervisión del Sistema Financiero (ASFI) emitió un comunicado destacando que los bancos en Bolivia mantienen indicadores de liquidez y solvencia por encima del mínimo legal exigido, garantizando la seguridad de los ahorros de la población.",
        "source": "Los Tiempos",
        "author": "Redacción Economía"
    },
    {
        "title": "Exportaciones de litio boliviano comenzarán a finales de este año, afirma YLB",
        "content": "La empresa estatal Yacimientos de Litio Bolivianos (YLB) ratificó que las primeras exportaciones comerciales de carbonato de litio grado batería procedentes del Salar de Uyuni se concretarán en el último trimestre, marcando un hito en la industrialización.",
        "source": "Página Siete",
        "author": "Agencias"
    }
]

FAKE_NEWS_TEMPLATES = [
    {
        "title": "¡URGENTE! El dólar paralelo supera los 20 bolivianos en La Paz y Santa Cruz",
        "content": "Imágenes exclusivas muestran que en las calles del centro de La Paz y el mercado mutualista en Santa Cruz, los librecambistas están vendiendo el dólar a 20.5 bolivianos. Fuentes aseguran que los bancos han cerrado las bóvedas y no entregarán más dólares a partir de mañana.",
        "source": "Cadena de WhatsApp / X",
        "author": "Usuario Anónimo"
    },
    {
        "title": "Gobierno decreta feriado bancario y congelamiento de ahorros en dólares",
        "content": "Se filtró un documento reservado del BCB donde se ordena un 'corralito' financiero inminente. A partir de este lunes, todas las cuentas en dólares serán convertidas a bolivianos al tipo de cambio oficial de 6.96, sin posibilidad de retirar divisas extranjeras.",
        "source": "Facebook - La Voz del Pueblo",
        "author": "Cuenta de noticias"
    },
    {
        "title": "Escasez total de combustible: YPFB se declara en quiebra y suspende importación",
        "content": "Un exfuncionario de YPFB reveló en un video que la empresa estatal no tiene fondos para pagar los buques de combustible en el puerto de Arica. Las gasolineras a nivel nacional cerrarán durante 15 días continuos. ¡Abastézcanse de inmediato!",
        "source": "TikTok viral",
        "author": "@boliviadespierta"
    },
    {
        "title": "Organismos internacionales suspenden apoyo crediticio a Bolivia por riesgo de impago",
        "content": "El FMI y el Banco Mundial habrían enviado una carta conjunta al Ministerio de Economía cancelando todos los desembolsos pendientes para proyectos de inversión, argumentando que el país entrará en default oficial la próxima semana.",
        "source": "Portal de Noticias Falsas",
        "author": "Bloguero de opinión"
    },
    {
        "title": "ASFI limitará retiros de cajeros automáticos a 500 bolivianos semanales",
        "content": "Una supuesta circular de la ASFI, difundida masivamente en grupos de Telegram, instruye a todas las entidades financieras configurar sus cajeros automáticos para que ningún ciudadano pueda retirar más de 500 Bs por semana debido a la falta de billetes.",
        "source": "Telegram Groups",
        "author": "Forwarded Message"
    }
]

def reseed_realistic_data():
    session = SessionLocal()
    
    try:
        # Delete existing data completely with cascade
        print("Eliminando datos anteriores y dependencias...")
        session.execute(text("TRUNCATE TABLE news CASCADE"))
        session.commit()
        
        needed_verified = 301
        needed_fake = 214
        
        news_items = []
        
        print(f"Generando {needed_verified} noticias verificadas (reales)...")
        for i in range(needed_verified):
            template = secrets.choice(REAL_NEWS_TEMPLATES)
            news = NewsModel(
                id=uuid4(),
                title=template["title"] + (f" (Reporte #{i})" if i > 0 else ""),
                content=template["content"],
                source=template["source"],
                author=template["author"],
                url=f"https://noticias-bolivia.com/real/{uuid4().hex[:8]}",
                language="es",
                country="Bolivia",
                published_at=datetime.now(timezone.utc) - timedelta(days=1 + secrets.randbelow(60), hours=1 + secrets.randbelow(24)),
                is_fake=False,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            news_items.append(news)
            
        print(f"Generando {needed_fake} noticias falsas (bulos)...")
        for i in range(needed_fake):
            template = secrets.choice(FAKE_NEWS_TEMPLATES)
            news = NewsModel(
                id=uuid4(),
                title=template["title"] + (f" - ¡Viral! ({i})" if i > 0 else ""),
                content=template["content"],
                source=template["source"],
                author=template["author"],
                url=f"https://redes-sociales.com/fake/{uuid4().hex[:8]}",
                language="es",
                country="Bolivia",
                published_at=datetime.now(timezone.utc) - timedelta(days=1 + secrets.randbelow(60), hours=1 + secrets.randbelow(24)),
                is_fake=True,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            news_items.append(news)
        
        print("Insertando en la base de datos...")
        session.bulk_save_objects(news_items)
        session.commit()
        print(f"¡Éxito! Se reinsertaron {needed_verified} reales y {needed_fake} falsas con textos más realistas.")
    except Exception as e:
        session.rollback()
        print(f"Error seeding news: {e}")
    finally:
        session.close()

if __name__ == '__main__':
    reseed_realistic_data()
