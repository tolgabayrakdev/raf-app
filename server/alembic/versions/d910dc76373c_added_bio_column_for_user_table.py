"""Added bio column for user table

Revision ID: d910dc76373c
Revises: b9c79c010484
Create Date: 2024-10-25 13:28:01.867667

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd910dc76373c'
down_revision: Union[str, None] = 'b9c79c010484'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('bio', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'bio')
    # ### end Alembic commands ###
