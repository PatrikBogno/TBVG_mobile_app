import styleGlobal from '../styleGlobal.js';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        minHeight: 50,
        width: '92%',
        marginTop: '4%',
        borderRadius: 10,
        backgroundColor: styleGlobal.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: styleGlobal.colors.detailsDark,
        shadowRadius: 5,
    },
    
});

export default style;