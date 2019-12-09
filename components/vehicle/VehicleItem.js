import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as vehicleUtils from "../../helpers/vehicleUtil";
import * as types from "../../helpers/types";
import AppStyles from "../../constants/Styles";
import TouchableCard from "../ui/TouchableCard";
import NumberPlate from "./NumberPlate";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const VehicleItem = props => {
  const { onSelect, data } = props;

  const status = types.VEHICLE_STATUS.find(s => s.value === data.status);
  const StatusIcon = status.Icon;
  return (
    <TouchableCard style={styles.card} onPress={onSelect}>
      <View style={styles.itemContainer}>
        <View style={styles.details}>
          <View style={styles.numberContainer}>
            <NumberPlate
              style={AppStyles.centered}
              title={vehicleUtils.displayFormat(data.number)}
            />
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.description} numberOfLines={1}>
              {data.description}
            </Text>
            <View style={styles.ownerContainer}>
              <View style={{ paddingRight: 9 }}>
                <Ionicons
                  name="md-bus"
                  size={22}
                  color={!!data.owner ? "brown" : "#aaa"}
                />
              </View>
              <Text style={styles.owner} numberOfLines={1}>
                {!data.owner ? "Owner not set" : "Owner - " + data.owner}
              </Text>
            </View>

            {data.drivers.map(driver => (
              <View
                key={driver.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <FontAwesome
                  name="drivers-license-o"
                  size={18}
                  color={driver.status === "ACTIVE" ? "brown" : "#aaa"}
                />
                <Text style={{ paddingLeft: 4 }} numberOfLines={1}>
                  {driver.name}
                </Text>
              </View>
            ))}
            {!data.drivers || data.drivers.length === 0 ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="drivers-license-o" size={18} color="#aaa" />
                <Text style={{ paddingLeft: 4 }} numberOfLines={1}>
                  No drivers set
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.subDetails}>
          <View style={styles.statusContainer}>
            {!!status ? (
              <StatusIcon
                name={status.iconName}
                size={22}
                color={status.iconColor}
              />
            ) : null}
            <Text style={styles.status} numberOfLines={1}>
              {!data.status ? "Status not set" : status.label}
            </Text>
          </View>
          <View style={styles.permitContainer}>
            <View style={{ paddingRight: 5 }}>
              <Ionicons
                name="md-paper"
                size={22}
                color={!data.permit ? "#aaa" : "green"}
              />
            </View>
            <Text style={styles.permit} numberOfLines={1}>
              {!data.permit
                ? "Permit not set"
                : types.VEHICLE_PERMIT.find(v => v.value === data.permit).label}
            </Text>
          </View>
        </View>
      </View>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
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
  numberContainer: {
    width: 80,
    height: 80
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 6
  },
  mainDetails: {
    paddingHorizontal: 20
  },
  description: {
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "bold"
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  owner: {
    fontSize: 16,
    paddingBottom: 4
  },
  statusContainer: {
    flexDirection: "row"
  },
  status: {
    fontSize: 16,
    paddingLeft: 6
  },
  permitContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  permit: {
    fontSize: 16,
    paddingBottom: 4
  }
});

export default VehicleItem;
