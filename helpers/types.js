import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";

export const VEHICLE_PERMIT = [
  { value: "", label: "None" },
  { value: "STATE", label: "State Permit" },
  { value: "NATIONAL", label: "National Permit" }
];

export const VEHICLE_STATUS = [
  {
    value: "",
    label: "None",
    Icon: FontAwesome,
    iconName: "minus-circle",
    iconColor: "#aaa"
  },
  {
    value: "RUNNING",
    label: "Running",
    Icon: MaterialCommunityIcons,
    iconName: "truck-fast",
    iconColor: "brown"
  },
  {
    value: "AVAILABLE",
    label: "Available",
    Icon: Feather,
    iconName: "truck",
    iconColor: "green"
  },
  {
    value: "UNDER_MAINTENANCE",
    label: "Under Maintenance",
    Icon: FontAwesome,
    iconName: "wrench",
    iconColor: "blue"
  },
  {
    value: "NEED_MAINTENANCE",
    label: "Need Repair",
    Icon: Ionicons,
    iconName: "md-warning",
    iconColor: "red"
  },
  {
    value: "INACTIVE",
    label: "Not Active",
    Icon: MaterialCommunityIcons,
    iconName: "cancel",
    iconColor: "#aaa"
  },
  {
    value: "SOLD",
    label: "Sold Out",
    Icon: FontAwesome,
    iconName: "rupee",
    iconColor: "black"
  }
];

export const DRIVER_STATUS = [
  { value: "", label: "None" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Not Active" }
];

export const DRIVER_TYPE = [
  { value: "", label: "None" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "PERMANENT", label: "Permanent" }
];
