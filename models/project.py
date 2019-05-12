from config.extensions import db
from models.ts_mixin import TimestampMixin


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    nickname = db.Column(db.Text)
    notes = db.Column(db.Text)
    first_month = db.Column(db.Integer, nullable=False)
    last_month = db.Column(db.Integer, nullable=False)
    # start_date = db.Column(db.DateTime)
    # end_date = db.Column(db.DateTime)
    assignments = db.relationship(
        'Assignment',
        backref='project',
        lazy=True
    )

    def __str__(self):
        return self.nickname

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'nickname': self.nickname,
            'first_month': self.first_month,
            'last_month': self.last_month,
            'notes': self.notes,
            'asns': [asn.serialize() for asn in self.assignments] if self.assignments else []
        }

    @staticmethod
    def get_all():
        return Project.query.order_by(Project.nickname).all()
