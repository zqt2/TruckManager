import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import TouchableCard from "../ui/TouchableCard";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AppStyles from "../../constants/Styles";

const DriverItem = props => {
  const { onItemSelect, data, isPicker } = props;
  const [picked, setPicked] = useState(props.picked);

  const selectHandler = () => {
    if (isPicker) {
      setPicked(prevPicked => !prevPicked);
    }
    onItemSelect && onItemSelect();
  };

  return (
    <TouchableCard
      style={picked ? styles.pickedCard : styles.card}
      onPress={selectHandler}
      noFeedback={isPicker}
    >
      <View style={styles.itemContainer}>
        <View style={styles.details}>
          <View style={styles.photoContainer}>
            <View style={AppStyles.centered}>
              {!data.photo ? (
                <FontAwesome name="user-secret" size={80} color="#666" />
              ) : (
                <Image
                  source={{
                    uri:
                      "http://res.cloudinary.com/bundlz-test/image/upload/v1536055984/Wohven_whkabm.png"
                  }}
                  style={styles.profileImage}
                />
              )}
            </View>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.phoneContainer}>
              <View style={{ paddingRight: 5 }}>
                <FontAwesome
                  name="phone"
                  size={22}
                  color={!!data.phone && !!data.altPhone ? "green" : "#aaa"}
                />
              </View>
              <Text style={styles.phone}>
                {!!data.phone
                  ? data.phone
                  : !!data.altPhone
                  ? data.altPhone
                  : "Not Available"}
              </Text>
            </View>
            <View style={styles.vehicleContainer}>
              <View style={{ paddingRight: 4 }}>
                <FontAwesome
                  name="truck"
                  size={22}
                  color={!!data.vehicle ? "green" : "#aaa"}
                />
              </View>
              <Text style={styles.vehicleNum}>
                {!!data.vehicle ? data.vehicle.number : "Not Available"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.subDetails}>
          <View style={styles.statusContainer}>
            <Ionicons name="md-heart-empty" size={22} color={"green"} />
            <Text style={styles.status}>
              {!!data.status
                ? data.status
                : "Not Active" /*  md-heart, md-heart-dislike, md-heart-empty, md-heart-half */}
            </Text>
          </View>
          <View style={styles.dlContainer}>
            <FontAwesome
              name="drivers-license"
              size={22}
              color={!!data.dlImage ? "green" : "#aaa"}
            />
            <Text style={styles.dl}>{!!data.dl ? data.dl : "No License"}</Text>
          </View>
        </View>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  pickedCard: {
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: "rgba(0,255,0,0.2)",
    elevation: 0
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 8
  },
  itemContainer: {
    width: "100%",
    padding: 10
  },
  details: {
    flexDirection: "row",
    borderBottomColor: "#666",
    borderBottomWidth: 0.5,
    paddingBottom: 6
  },
  subDetails: {
    flexDirection: "row",
    paddingTop: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderColor: "#ccc"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 6
  },
  mainDetails: {
    paddingHorizontal: 20
  },
  name: {
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "bold"
  },
  phone: {
    fontSize: 16,
    paddingBottom: 4
  },
  vehicleNum: {
    fontSize: 16,
    paddingBottom: 4
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  vehicleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  statusContainer: {
    flexDirection: "row"
  },
  status: {
    paddingLeft: 6
  },
  dlContainer: {
    flexDirection: "row"
  },
  dl: {
    paddingLeft: 6
  }
});

export default DriverItem;
