"""add knowledge refresh queue

Revision ID: 8f14a2b7c9d0
Revises: 4c2c9d1e7f10
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "8f14a2b7c9d0"
down_revision: Union[str, Sequence[str], None] = "4c2c9d1e7f10"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "knowledge_refresh_requests",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("query_hash", sa.String(length=64), nullable=False),
        sa.Column("query", sa.Text(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False, server_default="pending"),
        sa.Column("requested_at", sa.DateTime(), nullable=False),
        sa.Column("processed_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("query_hash"),
    )


def downgrade() -> None:
    op.drop_table("knowledge_refresh_requests")
