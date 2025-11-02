import global_style from '../styles/global_style.js';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        minHeight: 50,
        width: '92%',
        marginTop: '4%',
        borderWidth: 2,
        borderColor: global_style.colors.borders,
        borderRadius: 10,
        backgroundColor: global_style.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default style;