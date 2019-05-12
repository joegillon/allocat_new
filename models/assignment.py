from config.extensions import db
from models.ts_mixin import TimestampMixin


class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id') )
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    first_month = db.Column(db.Integer, nullable=False)
    last_month = db.Column(db.Integer, nullable=False)
    effort = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)

    def serialize(self):
        return {
            'id': self.id,
            'emp_id': self.employee_id,
            'prj_id': self.project_id,
            'first_month': self.first_month,
            'last_month': self.last_month,
            'effort': self.effort,
            'notes': self.notes
        }

    @staticmethod
    def get_all():
        return Assignment.query.all()
