/*=====================================================================
Master List Toolbar
=====================================================================*/
class MasterListToolbar {

  constructor(id, model) {
    this.wbxObj = {
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
              id: "clearFilterBtn",
              label: "Clear",
              type: "icon",
              icon: "eraser",
              tooltip: "Clear filter",
              click: function() {
                $$("masterListFilter").setValue("");
                $$("masterListFilter").callEvent("onTimedKeypress");
              }
            }
          ]
        }
      ]
    };
  };

  static clearFilter() {
    $$("masterListFilter").setValue("");
  }
}

/*=====================================================================
Master List
=====================================================================*/
class MasterList {

  constructor(id, displayFld) {
    this.wbxObj = {
      view: "list",
      id: id,
      select: true,
      height: 380,
      width: 250,
      template: "#" + displayFld + "#",
      display: displayFld
    }
  }
}

/*=====================================================================
Master List Panel
=====================================================================*/
class MasterListPanel {

  constructor(id, toolbar, list) {
    this.toolbar = toolbar;
    this.list = list;
    this.wbxObj = {
      id: id,
      rows: [toolbar.wbxObj, list.wbxObj]
    }
  };

  clear() {
    MasterListToolbar.clearFilter();
    this.list.clear();
  };

  load(data) {
    $$(this.list.wbxObj.id).clearAll();
    $$(this.list.wbxObj.id).parse(data);
  };

  select(id) {
    this.list.select(id);
    this.list.showItem(id);
  };

  getSelection() {
    return $$(this.list.wbxObj.id).getSelectedItem();
  }
}

/*=====================================================================
Detail Toolbar
=====================================================================*/
class DetailToolbar {

  constructor(id, model) {
    this.wbxObj = {
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
    this.wbxObj = {
      view: "form",
      id: id,
      elements: elements,
      rules: rules
    }
  };

  clear() {
    this.clear();
  };

  loadForm(data) {
    $$(this.wbxObj.id).setValues(data);
  };

}

/*=====================================================================
Detail Panel
=====================================================================*/
class DetailPanel {

  constructor(toolbar, form) {
    this.toolbar = toolbar;
    this.form = form;
    this.wbxObj = {
      rows: [toolbar.wbxObj, form.wbxObj]
    };
  }
}

/*=====================================================================
Master Detail Panel
=====================================================================*/
class MasterDetailPanel {

  constructor(listPanel, detailPanel) {
    this.wbxObj = {
      type: "space",
      margin: 10,
      cols: [listPanel.wbxObj, detailPanel.wbxObj]
    }
  }
}