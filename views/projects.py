from flask import Blueprint, render_template
from models.project import Project
from models.employee import Employee
from models.assignment import Assignment

prj = Blueprint('prj', __name__, url_prefix='/prj')


@prj.route('/list', methods=['GET'])
def prj_list():
    rex = Project.get_all()
    prjs = [rec.serialize() for rec in rex] if rex else []

    rex = Employee.get_all()
    emps = [{'id': rec.id, 'name': rec.name} for rec in rex]

    rex = Assignment.get_all()
    asns = [rec.serialize() for rec in rex] if rex else []

    return render_template(
        'projects/project_panel.html',
        title='allocat projects',
        projects=prjs,
        employees=emps,
        assignments=asns
    )
