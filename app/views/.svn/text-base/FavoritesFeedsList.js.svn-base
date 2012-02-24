/**
 * @author Zhang Ming
 */
rssreader.FavoritesFeedsList = Ext.extend(Ext.List, {
	activeCls: 'delete-item-active',
	singleSelect: true,
	//itemSelector:'div.feeds-list', 
//	tpl: new Ext.XTemplate(
//		'<html:iframe id="admob_ad">',
//		 '</html:iframe> '
//	),
	itemTpl: new Ext.XTemplate(
		 '<tpl for=".">',
        	'<div class="box feeds-list">',
				'<div class="feed-logo">',
						'<img src="{image_url:this.hasImage}" />',	
				'</div>',
				'<div class="action delete x-button">Delete</div>',
				'<div class="feed-bubble">',
                    '<div class="feed-content">',
                        '<h2>{name}</h2>',
                        '<p>{description}</p>',
                    '</div>',
                '</div>',
			'</div>',
        '</tpl>',
		{
			hasImage: function(url){
				if (url==""){
					return "http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png";
				}
				return url;
			}
		}
	),
	
	initComponent: function(){
		rssreader.FavoritesFeedsList.superclass.initComponent.apply(this, arguments);
		this.on({
            scope: this,
            itemswipe: this.onItemSwipe,
			afterrender: this.YQLRequest
        });			
	},
	
	onItemSwipe: function(list, index, node) {
        var el        = Ext.get(node),
            activeCls = this.activeCls,
            hasClass  = el.hasCls(activeCls);
        
        if (hasClass) {
            el.removeCls(activeCls);
			this.onItemDisclosure = true;
        } else {
            el.addCls(activeCls);
			this.onItemDisclosure = false;
        }
    },
	
	onItemTap: function(item, index, e) {
		if (e.getTarget('.' + this.activeCls + ' div.delete')) {
            var store = this.store;
            store.removeAt(index);
            store.sync();
            
        } else {
			var record = this.store.getAt(index);
			Ext.dispatch({
	            controller: "favorites",
	            action    : "showFeedList",
	            instance  : record
		    });
            return rssreader.FavoritesFeedsList.superclass.onItemTap.apply(this, arguments);
        }
    },
	
	YQLRequest: function(){
		this.store.each(function(rec){
			if(rec.get('description')==""||rec.get('image_url')==""){
				var index = this.indexOf(rec),
				    node = this.getNode(rec);
				rssreader.JsonP.YQLRequest(rec.get('url'), node, index);	
			}
		}, this);
	}
	
	
	
	
});

Ext.reg("rssreader-favorites-feeds-list", rssreader.FavoritesFeedsList);