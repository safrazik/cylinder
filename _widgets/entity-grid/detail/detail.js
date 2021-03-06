import {Dialog} from 'framework';
import {DataService} from 'framework';
import {Toast} from 'framework';

class EntityDialog extends Dialog  {
  
  constructor(dataService: DataService){
    super();
    this.dataService = dataService;
    this.entity = null;
    this.isNew = false;
    this.editMode = false;
    this.properties = [];
    this.settings = {};
  }

  get autoclose(){
    return !this.editMode;
  }
  
  saveChanges(){
    var entities = [this.entity];
    this.dataService.saveChanges(entities).then((data)=> {
      Toast.showPositive('Data saved successfully');
    }, (error)=> {
      Toast.showNegative('Error occured while saving');
    });
  }
  
  cancelChanges(){
    this.entity.entityAspect.rejectChanges();
  }

  activate(settings){
    this.settings = settings;
    if(settings.entity){
      this.entity = settings.entity;
      this.isNew = false;
      this.editMode = false;
    }
    else {
      this.entity = this.dataService.create(settings.entityType);
      this.isNew = true;
      this.editMode = true;
    }
    this.properties = settings.properties;
    // this.editMode = true;
  }
  
  ok(){
    this.saveChanges();
    this.close(this.entity);
  }

  cancel(){
    this.cancelChanges();
    this.close();
  }

}

export default EntityDialog;