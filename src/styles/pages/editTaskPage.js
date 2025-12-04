import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
        backgroundColor: styleGlobal.colors.secondaryLight,
    },

    pageTitle: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
    },

    containerTask: {
        height: '74%'
    },

    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        width: '92%'
    },

    buttonContainerLeft: {
        flex: 5,
        width: 'auto',
        marginRight: '4%'
    },

    buttonContainerRight: {
        flex: 1.1,
        width: 'auto'
    },
    
    icon: {
        height: 40,
        width: 40,
        strokeWidth: 1.5
    }

})

module.exports = style;