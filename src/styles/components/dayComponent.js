import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        
    },

    containerItem: {
        width: '100%',
        Height: '10%',
        alignItems: 'center'
    }


})

module.exports = style;