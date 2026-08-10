"""add model feedback

Revision ID: f6d3b2a8c710
Revises: 8f14a2b7c9d0
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = "f6d3b2a8c710"
down_revision: Union[str, Sequence[str], None] = "8f14a2b7c9d0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "model_feedback",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("user_id", sa.UUID(), nullable=False),
        sa.Column("query", sa.Text(), nullable=False),
        sa.Column("predicted_label", sa.String(length=40), nullable=False),
        sa.Column("corrected_label", sa.String(length=40), nullable=True),
        sa.Column("status", sa.String(length=30), nullable=False, server_default="pending_review"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("model_feedback")
