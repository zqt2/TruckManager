import React, { useState } from "react";
import { View } from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation
} from "react-native-popup-dialog";

const InputDialog = props => {
  const { title, isVisible, onSave, children } = props;
  const [visible, setVisible] = useState(isVisible);

  return (
    <Dialog
      onDismiss={() => {
        setVisible(false);
      }}
      onTouchOutside={() => {
        setVisible(false);
      }}
      width={1} // 0-1
      height={0.8}
      visible={visible}
      dialogTitle={<DialogTitle title={title} />}
      dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      onHardwareBackPress={() => {
        console.log("onHardwareBackPress");
        setVisible(false);
        return true;
      }}
      footer={
        <DialogFooter>
          <DialogButton
            text="Cancel"
            bordered
            onPress={() => {
              setVisible(false);
            }}
            key="button-1"
          />
          <DialogButton
            text="Save"
            bordered
            onPress={() => {
              setVisible(false);
              onSave();
            }}
            key="button-2"
          />
        </DialogFooter>
      }
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default InputDialog;
