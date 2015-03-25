import {Dialog} from 'framework';

class MyGreeting extends Dialog {
	constructor(){
		this.name = null;
	}
	ok(){
		return this.close();
	}
	cancel(){
		return this.close();
	}
	activate(settings){
		this.name = settings.name;
	}
}

export default MyGreeting;