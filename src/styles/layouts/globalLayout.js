import styleGlobal from '../styleGlobal';

var React = require('react-native');

const style = React.StyleSheet.create({
    container: {
        flex: 1,
        height: React.Dimensions.get("screen").height,
        backgroundColor: styleGlobal.colors.primary,
    },
    containerSafeArea: {  
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 0,
    },
    header: {
        flex: 10,
        borderBottomWidth: 2,
        borderBottomColor: styleGlobal.colors.borders,
    },
    containerPage: {
        flex: 80,
    },
    footer: {
        flex: 10,
    },
})

module.exports = style;