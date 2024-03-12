import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLoginNRegister: {
    alignItems: "center",
    backgroundColor: "rgb(93, 95, 222)",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  content: {
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: "rgb(58, 58, 60)",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 80,
  },
  subtitle: {
    color: "#0066ff",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
  textButton: {
    color: "#bfbfbf",
    fontSize: 15,
    fontWeight: "100",
    lineHeight: 20,
  },
  textInput: {
    color: "#ffffff",
    flex: 1,
  },
  title: {
    color: "#0066ff",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  homeCard: {
    backgroundColor: "white",
    flexBasis: "auto",
    borderRadius: 10
  },
  imageSize: {
    height: 350
  },
  centeredView: {
    flex: 1
  },
  modalView: {
    backgroundColor: 'white',
    height: "100%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row"
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
