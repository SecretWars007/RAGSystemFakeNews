"""add knowledge ingestion tables

Revision ID: 4c2c9d1e7f10
Revises: 73a75c3a1744
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector


revision: str = "4c2c9d1e7f10"
down_revision: Union[str, Sequence[str], None] = "73a75c3a1744"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "trusted_sources",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("base_url", sa.String(length=1000), nullable=False),
        sa.Column("source_type", sa.String(length=40), nullable=False),
        sa.Column("priority", sa.Integer(), nullable=False, server_default="100"),
        sa.Column("crawl_interval_minutes", sa.Integer(), nullable=False, server_default="1440"),
        sa.Column("extraction_config", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("last_crawled_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("base_url"),
        sa.UniqueConstraint("name"),
    )
    op.create_table(
        "knowledge_documents",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("source_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=500), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("canonical_url", sa.String(length=1000), nullable=False),
        sa.Column("content_hash", sa.String(length=64), nullable=False),
        sa.Column("published_at", sa.DateTime(), nullable=True),
        sa.Column("fetched_at", sa.DateTime(), nullable=False),
        sa.Column("validation_status", sa.String(length=40), nullable=False, server_default="pending"),
        sa.Column("fact_label", sa.String(length=40), nullable=True),
        sa.Column("is_training_eligible", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.ForeignKeyConstraint(["source_id"], ["trusted_sources.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("canonical_url", name="uq_knowledge_documents_canonical_url"),
        sa.UniqueConstraint("content_hash"),
    )
    op.create_table(
        "knowledge_document_embeddings",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("document_id", sa.UUID(), nullable=False),
        sa.Column("provider", sa.String(length=50), nullable=False),
        sa.Column("model", sa.String(length=120), nullable=False),
        sa.Column("dimensions", sa.Integer(), nullable=False),
        sa.Column("vector", Vector(3072), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["document_id"], ["knowledge_documents.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("document_id", "provider", "model", name="uq_knowledge_document_embedding_model"),
    )
    op.create_index("ix_knowledge_documents_source_status", "knowledge_documents", ["source_id", "validation_status"])
    op.execute(
        "CREATE INDEX ix_knowledge_document_embeddings_vector "
        "ON knowledge_document_embeddings USING hnsw (vector vector_cosine_ops)"
    )


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS ix_knowledge_document_embeddings_vector")
    op.drop_index("ix_knowledge_documents_source_status", table_name="knowledge_documents")
    op.drop_table("knowledge_document_embeddings")
    op.drop_table("knowledge_documents")
    op.drop_table("trusted_sources")
