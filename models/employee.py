from config.extensions import db
from models.ts_mixin import TimestampMixin


class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text)
    investigator = db.Column(db.Boolean)
    # assignments = db.relationship(
    #     'Assignment',
    #     backref='employee',
    #     lazy=True
    # )

    def __str__(self):
        return self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'notes': self.notes,
            'investigator': self.investigator
        }

    @staticmethod
    def get_all():
        return Employee.query.order_by(Employee.name).all()
