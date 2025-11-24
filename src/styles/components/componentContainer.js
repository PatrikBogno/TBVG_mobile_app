import global_style from '../styles/global_style.js';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        minHeight: 50,
        width: '92%',
        marginTop: '4%',
        borderRadius: 10,
        backgroundColor: global_style.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: global_style.colors.details_dark,
        shadowRadius: 5,
    },
    
});

export default style;