export class Storage {
  get(key){
   return JSON.parse(localStorage.getItem(key));
  }
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
  clear(){
  	localStorage.clear();
  }
}