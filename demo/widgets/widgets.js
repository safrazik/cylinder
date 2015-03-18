import {DataService, Paginator} from 'framework';
import {Toast} from 'framework';
import {Dialog} from 'framework';
import TestDialog from './test-dialog/test-dialog';


class MyModel {
	constructor(){
		this.someDate = new Date();
		this.color = null;
	}
}

class Widgets {
	constructor(db: DataService, paginator: Paginator, toast: Toast, testDialog: TestDialog){
		this.db = db;
		this.longText = 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Integer molestie lorem at massa. Facilisis in pretium nisl aliquet. Nulla volutpat aliquam velit. Phasellus iaculis neque. Purus sodales ultricies. Vestibulum laoreet porttitor sem. Ac tristique libero volutpat at. Faucibus porta lacus fringilla vel. Aenean sit amet erat nunc. Eget porttitor lorem.  Consectetur adipiscing elit. Integer molestie lorem at massa. Facilisis in pretium nisl aliquet. Nulla volutpat aliquam velit. Phasellus iaculis neque. Purus sodales ultricies. Vestibulum laoreet porttitor sem. Ac tristique libero volutpat at. Faucibus porta lacus fringilla vel. Aenean sit amet erat nunc.';
		this.myModel = new MyModel();
		this.colors = [
			'blue', 'orange', 'red', 'green',
		];
		this.selectedItem = null;
		this.items = [];
	    this.paginator = paginator.create('Branch', {}, {}, (results) => {
	      this.items = results;
	    });
	    this.paginator.pageSize = 2; // for testing
	    this.attachment = this.db.create('File');
	    this.toast = toast;
	    this.testDialog = testDialog;
	}

	showMore(event){
		alert(this.longText);
		// dialog.show('complaint/detail/more/more', this.complaint);
	}

	revealCallback(){
		return this.showMore.bind(this);
	}

	updateSomeDate(date){
		alert('Date changed! ' + date);
	}

	datePickerCallback(){
		return this.updateSomeDate.bind(this);
	}

	dropdown($event){
		// 		<dropdown-picker object.bind="myModel" property.bind="'color'" 
		// 		options.bind="colors" caption.bind="'-- Choose Color --'"></dropdown-picker>
		dialog.showActionsheet('_widgets/lookup-popup/lookup-popup', {
			object: this.myModel,
			property: 'color',
			options: this.colors,
			caption: '-- Choose Color --',
			target: $event.target,
		});
	}

	showToast(variant = ''){
		this.toast['show' + variant]('This is a ' + variant + ' Toast')
	}

	showDialog($event){
		var data = {};
		var options = {autoclose: true, overlay: false};
		if($event){
			options.popover = $event.target;
		}
		// this.testDialog.show(data, options);
		Dialog.showInstance('cylinder/demo/widgets/test-dialog', data, options); // another way
	}

	activate(){
		this.selectedItem = this.db.getOne('Item');
		// console.log('iiii', this.item);
		this.paginator.activate();
	}
}

export default Widgets;
