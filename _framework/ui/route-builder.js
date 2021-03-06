// var _routePrefix = 'app/';
var _routePrefix = '';
var _moduleIdConvention = false;

export class RouteBuilder {

  static getRoutePrefix(){
    return _routePrefix;
  }

  static setRoutePrefix(prefix){
    _routePrefix = prefix;
  }

  static enableModuleIdConvention(moduleIdConvention){
    _moduleIdConvention = moduleIdConvention;
  }

  static prepareModuleId(moduleId, includeRoutePrefix = false){
    if(_moduleIdConvention){
      var moduleIdParts = moduleId.split('/');
      moduleId = moduleId + '/' + moduleIdParts[moduleIdParts.length - 1];
    }
    if(includeRoutePrefix && _routePrefix){
      moduleId = _routePrefix + moduleId;
    }
    return moduleId;
  }

  static buildRouteConfig(route, includeRoutePrefix = false){
    if(typeof route === "string"){
      route = {route: route};
    }
    if(typeof route.pattern !== "undefined"){
      route.route = route.pattern;
      delete route.pattern;
    }
    //		if(typeof route.controller !== "undefined"){
    //			route.moduleId = route.controller;
    //			delete route.controller;
    //		}
    if(!route.moduleId){
      route.moduleId = route.route;
    }
    if(route.moduleId.indexOf(':') !== -1){
      route.moduleId = route.moduleId.split(':')[0];
    }
    // if(route.moduleId.indexOf('/') !== -1){
    //   route.moduleId = route.moduleId.replace(/\//g, '');
    // }
    if(!route.moduleId){
      throw new Error('"moduleId" not set for route: "' + route.route + '"');
    }
    route.moduleId = route.moduleId.replace('*details', '');
    route.moduleId = RouteBuilder.prepareModuleId(route.moduleId, includeRoutePrefix);
    return route;
  }
}