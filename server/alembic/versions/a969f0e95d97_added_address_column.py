"""Added address column

Revision ID: a969f0e95d97
Revises: d910dc76373c
Create Date: 2024-10-25 15:20:56.461981

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a969f0e95d97'
down_revision: Union[str, None] = 'd910dc76373c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('address', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'address')
    # ### end Alembic commands ###
