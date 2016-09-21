"use strict"
import React from 'react';

const RouteHistory = {
    hashTable:[],
    curHash:{state:{},hash:"/"},
    pushHash:function(hash,state){
        this.hashTable.push(this.curHash);
        this.curHash = {
            hash:hash,
            state:state
        };
        location.hash = hash;
    }
};
const RouterUtils = {
    createRoute:function(element,parentProps){
        var location=parentProps.location+"/"+element.props.path,
            components=parentProps.components.concat([element.props.component]);
        return {
            location:location,
            components: components
        }
    },
    createRoutesByPropsChildren:function(children,parentProps){
		var isArray = children instanceof Array;
		if(!isArray) children = [children];
		
        var routes = new Array();
        for(var i=0;i<children.length;i++){
            var element = children[i];
            var route = this.createRoute(element,parentProps)
            
            if(element.props.children instanceof Array){
                route.routes = this.createRoutesByPropsChildren(element.props.children, route)
            }
            else if(element.props.children instanceof Object){
                route.routes = this.createRoutesByPropsChildren([element.props.children], route)
            }
            // delete element.props.children;
            routes.push(route);
        }
        return routes;
    },
    createRoutes:function(parentProps){
            var parentRoute = {
                components:[parentProps.component],
                location:""
            }
            parentRoute.routes = this.createRoutesByPropsChildren(parentProps.children,parentRoute);
            // delete parentProps.children;
            return parentRoute;
    }
}

class Router extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			location: null,
			routes:null,
			components:null
		};
    }
    componentWillMount(){
	  var defaultRoute = this.props.defaultRoute ?this.props.defaultRoute:"/";
	  var hash = location.hash.replace("#","");
      if(hash!=this.state.location){
		  hash = hash || defaultRoute;
      }
	  RouteHistory.pushHash(hash);
		
      var routes = RouterUtils.createRoutes(this.props);
      var components = this._parseHash(routes,hash);
      this.setState({
          routes:routes,
          components:components
      })
  }
    componentDidMount(){
     window.addEventListener("hashchange",this._handleHashChange.bind(this))  
  }
    componentWillUnmount(){
      window.removeEventListener("hashchange",this._handleHashChange.bind(this))
  }
    _matchLocation(_location,hash){
      var locations = _location.split("/");
      var hashs = hash.split("/");
      var props = { location:hash }
      if(locations.length==hashs.length){
           var results = locations.filter(function(ele,pos){
               var _hash = hashs[pos];
               if(_hash.indexOf("?")!=-1){
                    var _hashs = _hash.split("?");
                    hashs[pos] = _hashs[0];
                    var eles = _hashs[1].split("&");
                    for(var i=0;i<eles.length;i++){
                        var objs = eles[i].split("=");
                        props[objs[0]] = objs[1];
                    }
               }
               if(ele.indexOf(":")!=-1){
                   props[ele.split(":")[1]] = hashs[pos];
                   return true;
               }else{
                   return ele == hashs[pos];
               }
           }) 
           return results.length == locations.length?props:null;
      }
      return null;
  }
    _parseHashByRoutes(routes,hash){
     for(var i=0;i<routes.length;i++){
         var route = routes[i];
         var props = this._matchLocation(route.location,hash);
         if(props){
             route.props = props;
             return route;
         }
         if(route.routes){
             var result = this._parseHashByRoutes(route.routes,hash);
             if(result!=null) return result;
         }
     }
     return null;
  }
    _parseHash(routes,hash){
      var route = this._parseHashByRoutes(routes.routes,hash);
      if(route==null) return React.createElement("div",null,"404");
      return this._createElementByComponents(route.components,route.props);
   }
    _createElementByComponent(component,components,props){
        if(components.length>1){
            var _components = components.filter(function(ele,pos){return pos>0});
            var child = this._createElementByComponent(_components[0], _components,props);
            return React.createElement(component,props,child);
        }else{
            return React.createElement(component,props,null);
        }
    }
    _createElementByComponents(components,props){
            return this._createElementByComponent(components[0],components,props)
    }
    _handleHashChange(){
      var hash = location.hash.replace("#","");
		
      var components = this._parseHash(this.state.routes,hash);
      this.setState({
          location:hash,
          components:components
      })
  }
    render() {     
    return (
      <div className={"react-router"+(this.props.className?" "+this.props.className:"")}>
            { 
                    this.state.components 
            }
      </div>
    );
  }
};
const Route = () => {
  	return (<div></div>);
}

class Link extends React.Component {
    handleClick(e){
        var to = this.props.to;
        RouteHistory.pushHash(to);
        if(this.props.onClick){
            this.props.onClick(e);
        }
    }
    render(){
        var props = this.props;
        if(props.anchor){
                return (<a key={props.key} data-status={props["data-status"]} data-target={props["data-target"]} title={props.title} className={"link"+(props.className?" "+props.className:"")+(props.active?" active":"")}  onClick={this.handleClick.bind(this)} style={props.style}>
                                { props.children }
                        </a>)
        }
		else{
                return (<div key={props.key} data-status={props["data-status"]} data-target={props["data-target"]} title={props.title} className={"link"+(props.className?" "+props.className:"")+(props.active?" active":"")}  onClick={this.handleClick.bind(this)} style={props.style}>
                        { props.children }
                </div>)
        }

    }
};

module.exports.Router = Router;
module.exports.Route = Route;
module.exports.Link = Link;
module.exports.RouteHistory = RouteHistory;