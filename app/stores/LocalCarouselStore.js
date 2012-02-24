/**
 * @author Zhang Ming
 */

Ext.regStore('Carousel', {
    model: 'FeedsGroup',
    sorters: { property: 'name', direction: 'ASC'},
    storeId: 'carousel',
    autoLoad: true,
    proxy: {
        type: 'localstorage',
        id  : 'local-carousel'
    }
});

