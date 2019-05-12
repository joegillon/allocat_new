/*=====================================================================
Master List Toolbar
=====================================================================*/
class MasterListToolbar {

  constructor(id, model) {
    this.ui = {
      view: "toolbar",
      id: id,
      height: 80,
      rows: [
        {
          cols: [
            {
              view: "label",
              label: model + "s"
            },
            {},
            {
              view: "button",
              label: "Add",
              type: "icon",
              icon: "plus-circle",
              tooltip: "New " + model
            }
          ]
        },
        {
          type: "wide",
          paddingX: 5,
          cols: [
            {
              view: "text",
              id: "masterListFilter",
              align: "left",
              label: 'Filter',
              width: 200
            },
            {
              view: "button",
              label: "Clear",
              type: "icon",
              icon: "eraser",
              tooltip: "Clear filter",
              click: function() {
                $$("masterListFilter").setValue("");
              }
            },
            {}
          ]
        }
      ]
    };
  }
}

/*=====================================================================
Master List
=====================================================================*/
class MasterList {

  constructor(id, displayFld) {
    this.displayFld = displayFld;
    this.ui = {
      view: "list",
      id: id,
      select: true,
      height: 380,
      width: 300,
      template: "#" + displayFld + "#"
    }
  }
}

/*=====================================================================
Master List Panel
=====================================================================*/
class MasterListPanel {

  constructor(toolbar, list) {
    this.toolbar = toolbar;
    this.list = list;
    this.ui = {
      rows: [toolbar, list]
    }
  };

  clear() {
    this.filterBox.setValue("");
    this.list.clear();
  };

  load(data) {
//     this.filterBox.setValue("");
    this.list.parse(data);
  };

  select(id) {
    this.list.select(id);
    this.list.showItem(id);
  }
}

/*=====================================================================
Detail Toolbar
=====================================================================*/
class DetailToolbar {

  constructor(id, model) {
    this.ui = {
      view: "toolbar",
      id: id,
      height: 35,
      cols: [
        {view: "label", label: model + " Details"},
        {
          view: "button",
          id: "detailSaveBtn",
          label: "Save",
          type: "icon",
          icon: "save",
          tooltip: "Save " + model
        },
        {
          view: "button",
          id: "detailDropBtn",
          label: "Drop",
          type: "icon",
          icon: "times-circle",
          tooltip: "Drop " + model
        }
      ]
    }
  }
}

/*=====================================================================
Detail Form
=====================================================================*/
class DetailForm {

  constructor(id, elements, rules) {
    this.ui = {
      view: "form",
      id: id,
      elements: elements,
      rules: rules
    }
  };

  clear() {
    this.clear();
  };

  load(data) {
    this.setValues(data);
  };

}

/*=====================================================================
Detail Panel
=====================================================================*/
class DetailPanel {

  constructor(toolbar, form) {
    this.ui = {
      rows: [toolbar, form]
    };
  }
}

/*=====================================================================
Master Detail Panel
=====================================================================*/
class MasterDetailPanel {

  constructor(listPanel, detailPanel) {
    this.ui = {
      type: "space",
      margin: 10,
      cols: [listPanel, detailPanel]
    }
  }
}
