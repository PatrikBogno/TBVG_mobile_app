import styleGlobal from '../styleGlobal';

var React = require('react-native');

var styles = React.StyleSheet.create({
  searchContainer: {
    width: '90%',
  },
  searchInput: {
    height: 44,
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default styles;
