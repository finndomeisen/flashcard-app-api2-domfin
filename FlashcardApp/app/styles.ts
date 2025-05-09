import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#7f8c8d',
  },
  buttonAreaTop: {
    marginTop: 20,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%', // 🟩 passt für zwei Spalten nebeneinander
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  item: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  columnWrapper: {
    justifyContent: 'space-between', // sorgt für gleichmässigen Abstand
    marginBottom: 12,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  cardItem: {
    fontSize: 16,
    paddingVertical: 6,
    color: '#ffffff',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardAnswer: {
    fontSize: 14,
    color: '#555',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF', // iOS-Blau, oder z. B. "#6200ee"
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Android
    zIndex: 99,
  },

  buttonIcon: {
    color: '#fff',
    fontSize: 28,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  secondaryButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabButton: {
  flex: 1,
  padding: 10,
  alignItems: 'center',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent'
},
tabButtonActive: {
  borderBottomColor: '#007AFF'
},
  


  
  

  
});

export default styles;


