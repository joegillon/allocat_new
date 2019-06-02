/*=====================================================================
Project Form Elements
=====================================================================*/
let prjElements = [
  {view: "text", name: "id", hidden: true},
  {
    view: "textarea",
    label: "Name",
    labelAlign: "right",
    name: "name",
    width: 300,
    height: 100,
    invalidMessage: "Project name is required!"
  },
  {
    view: "text",
    label: "Nickname",
    labelAlign: "right",
    name: "nickname",
    width: 300,
    invalidMessage: "Project nickname is required!"
  },
  {
    view: "text",
    label: "First Month",
    labelAlign: "right",
    name: "first_month",
    placeholder: "MM/YY",
    width: 300,
    invalidMessage: "Month format is numeric MM/YY!"
  },
  {
    view: "text",
    label: "Last Month",
    labelAlign: "right",
    name: "last_month",
    placeholder: "MM/YY",
    width: 300,
    invalidMessage: "Month format is numeric MM/YY!"
  },
  {
    view: "textarea",
    label: "Notes",
    labelAlign: "right",
    name: "notes",
    width: 300,
    height: 200
  }
];

/*=====================================================================
Project Form Rules
=====================================================================*/
let prjRules = {
    "name": webix.rules.isNotEmpty,
    "nickname": webix.rules.isNotEmpty,
    "first_month": MonthLib.isValidInput,
    "last_month": MonthLib.isValidInput
};

/*=====================================================================
Assignment Form Elements
=====================================================================*/
var asnElements = [
  {
    view: "combo",
    label: "Employee",
    labelAlign: "right",
    name: "employee",
    width: 300,
    options: empNames.map(emp => emp.name),
    invalidMessage: "Employee is required!"
  },
  {
    view: "text",
    label: "Project",
    labelAlign: "right",
    name: "project",
    width: 300,
    readonly: true,
    invalidMessage: "No project has been selected!"
  },
  {
    view: "text",
    label: "First Month",
    labelAlign: "right",
    name: "first_month",
    placeholder: "MM/YY",
    width: 300,
    invalidMessage: "Month format is numeric MM/YY!"
  },
  {
    view: "text",
    label: "Last Month",
    labelAlign: "right",
    name: "last_month",
    placeholder: "MM/YY",
    width: 300,
    invalidMessage: "Month format is numeric MM/YY!"
  },
  {
    view: "text",
    label: "Effort",
    labelAlign: "right",
    name: "effort",
    invalidMessage: "Percent Effort must be 0-100!"
  },
  {
    view: "textarea",
    label: "Notes",
    labelAlign: "right",
    name: "notes",
    width: 300,
    height: 230
  }
];

/*=====================================================================
Assignment Form Rules
=====================================================================*/
var asnRules = {
  "project": webix.rules.isNotEmpty,
  "employee": webix.rules.isNotEmpty,
  "first_month": MonthLib.isValidInput,
  "last_month": MonthLib.isValidInput,
  "effort": function(value) {
    return isValidEffort(value);
  }
};

/*=====================================================================
Project Panel Controller
=====================================================================*/
var prjPanelCtlr = {

  init: function() {

    if (db.prjs.length == 0) db.prjs = TAFFY(projects);
    if (db.asns.length == 0) db.asns = TAFFY(assignments);
    db.empNames = TAFFY(empNames);

    this.initPrj();
    this.initAsn();

    this.buildUI();

    $$("prjDetailForm").bind($$("prjList"));

    let asnForm = this.asnDetailForm;
    let prjPanel = this.prjListPanel;
    $$("asnList").attachEvent("onSelectChange", function() {
      let asn = $$("asnList").getSelectedItem();
      asn.employee = db.empNames({id: asn.employee_id}).first().name;
      asn.project = prjPanel.getSelection().nickname;
      asn.first_month = MonthLib.prettify(asn.first_month);
      asn.last_month = MonthLib.prettify(asn.last_month);
      asnForm.loadForm(asn);
    });

    let prjFilter = $$("ProjectFilter");
    prjFilter.attachEvent("onTimedKeypress", function() {
      let value = prjFilter.getValue();
      $$("prjList").filter(function(obj) {
        return obj[$$("prjList").config.display].toLowerCase().indexOf(value) != -1;
      })
    });

    let asnFilter = $$("AssignmentFilter");
    asnFilter.attachEvent("onTimedKeypress", function() {
      let value = asnFilter.getValue();
      $$("asnList").filter(function(obj) {
        return obj[$$("asnList").config.display].toLowerCase().indexOf(value) != -1;
      })
    });

    let lstPanel = this.asnListPanel;
    $$("prjList").attachEvent("onSelectChange", function() {
      let asns = $$("prjList").getSelectedItem().asns;
      if (asns === undefined || asns.length == 0) return;
      asns.map(asn => asn.employee = db.empNames({id: asn.emp_id}).first().name);
      lstPanel.load(asns);
    });

    $$("listAddBtn").attachEvent("onItemClick", function() {
      $$("prjDetailForm").clear();
    });

    $$("detailSaveBtn").attachEvent("onItemClick", function() {
      let frm = $$("prjDetailForm");
      if (!frm.validate()) return;
      let values = frm.getValues({hidden: true});
      let url = Flask.url_for("prj.prj_add");
      ajaxDao.post(url, values, function(data) {
        values.id = data["prj_id"];
        db.prjs(values);
        addToList("prjList", values, "nickname");
      })
    });

    $$("detailDropBtn").attachEvent("onItemClick", function() {
      webix.confirm(
        "Are you sure you want to drop this project?",
        "confirm-warning",
        function (yes) {
          if (yes) {
            let prj_id = $$("prjDetailForm").getValues().id;
            let url = Flask.url_for("prj.prj_drop");
            ajaxDao.post(url, {prj_id: prj_id}, function(data) {
              if (data.hasOwnProperty('error')) {
                webix.message({type: "error", text: data["error"]});
              } else {
                webix.message(data['msg']);
                db.asns({project_id: prj_id}).remove();
                db.prjs({id: prj_id}).remove();
                $$("prjList").remove(prj_id);
              }
            })
          }
        }
      );
    });
    
    this.prjListPanel.load(projects);
  },

  initPrj: function() {
    this.prjListToolbar = new MasterListToolbar("prjListToolbar", "Project");
    this.prjList = new MasterList("prjList", "nickname");
    this.prjListPanel = new MasterListPanel("prjListPanel", this.prjListToolbar, this.prjList);

    this.prjDetailToolbar = new DetailToolbar("prjDetailToolbar", "Project");
    this.prjDetailForm = new DetailForm("prjDetailForm", prjElements, prjRules);
    this.prjDetailPanel = new DetailPanel(this.prjDetailToolbar, this.prjDetailForm);

    this.prjPanel = new MasterDetailPanel(this.prjListPanel, this.prjDetailPanel);
  },

  initAsn: function() {
    this.asnListToolbar = new MasterListToolbar("asnListToolbar", "Assignment");
    this.asnList = new MasterList("asnList", "employee");
    this.asnListPanel = new MasterListPanel("asnListPanel", this.asnListToolbar, this.asnList);

    this.asnDetailToolbar = new DetailToolbar("asnDetailToolbar", "Assignment");
    this.asnDetailForm = new DetailForm("asnDetailForm", asnElements, asnRules);
    this.asnDetailPanel = new DetailPanel(this.asnDetailToolbar, this.asnDetailForm);

    this.asnPanel = new MasterDetailPanel(this.asnListPanel, this.asnDetailPanel);
  },

  buildUI: function() {
    let prjView = {
      id: "prjView",
      rows: [this.prjPanel.wbxObj],
      autowidth: true
    };

    let asnView = {
      id: "asnView",
      rows: [this.asnPanel.wbxObj],
      autowidth:true
    };

    let prjMgtUI = {
      container: "content_container",
      rows: [
        {
          view: "segmented",
          id: "prjMgtUI",
          multiview: true,
          value: "prjView",
          options: [
            {id: "prjView", value: "Projects"},
            {id: "asnView", value: "Assignments"}
          ]
        },
        {
          cells: [prjView, asnView],
          autowidth: true
        }
      ]
    };

    webix.ui(prjMgtUI);
  }

};
