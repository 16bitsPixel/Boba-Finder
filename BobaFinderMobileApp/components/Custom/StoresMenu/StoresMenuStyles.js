import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  handle: {
    backgroundColor: '#C5E7E2',
  },
  container: {
    backgroundColor: '#C5E7E2',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    paddingVertical: "5%",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    width: '90%',
    height: 140,
    borderRadius: "12px",
    padding: 6,
    margin: 6,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hours: {
    fontSize: 12,
    color: '#555',
  },
  distance: {
    fontSize: 12,
    color: '#555',
  },
})