# ionic-top-tabs
top tabs for ionic  
* ionic default `nav-tabs` would change the view history

#### Requirements

-  Angular
-  ionic

#### Usage
-  install from bower  

	````shell
	bower install ionic-top-tabs --save
	````
-  include module <code>ionicTopTabs</code>
-  import scss file  

	````scss
	@import "../../bower_components/ionic/scss/ionic";
	@import "../../bower_components/ionic-top-tabs/tabs";
	````

-  define a tab list in controller and a default activated tab

	````javascript
	vm.statusMap = [
	      {id: 3, title: '待发货'},
	      {id: 4, title: '配送中'},
	      {id: 5, title: '已配送'},
	      {id: 6, title: '已完成'}
	    ];
	    
	vm.status = 3;
	````
	
-  directive usage in html  

	````html
	<top-tabs tabs="history.statusMap" activated="history.status" type="energized"></top-tabs>
	````
	* type options: `energized`, `positive`, `balanced`, `assertive`, 		`calm`, `royal`  
	* tab switch will update model pass to `activated`