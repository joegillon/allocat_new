import json
from flask import Blueprint, render_template, request, jsonify
from models.project import Project
from models.employee import Employee
from models.assignment import Assignment

prj = Blueprint('prj', __name__, url_prefix='/prj')

from allocat import app


@prj.route('/list', methods=['GET'])
def prj_list():
    app.logger.info('User has opened Projects.')
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


@prj.route('/add', methods=['POST'])
def prj_add():
    params = json.loads(request.form['params'])
    project = Project(params)
    prj_id = project.add()
    return jsonify({'prj_id': prj_id})


@prj.route('/drop', methods=['POST'])
def prj_drop():
    params = json.loads(request.form['params'])
    try:
        project = Project.get_one(params['prj_id'])
        project.drop()
    except Exception as ex:
        msg = str(ex.orig) + '. See John Colozzi.'
        return jsonify({'error': msg})
    return jsonify({'msg': "Project dropped!"})
