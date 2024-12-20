import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Column, FormControl, IButtonProps, Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

type GenderButtonProps = { active?: boolean; iconName: string } & IButtonProps;

export enum EGender {
  Male = "Male",
  Female = "Female",
}

const GenderButton = ({ active, iconName, children, ...buttonProps }: GenderButtonProps) => (
  <Button
    rounded="full"
    flex="1"
    _text={{ color: active ? "white" : "coolGray.400", bold: active }}
    bg={active ? "coolGray.400" : "coolGray.600"}
    variant="unstyled"
    leftIcon={
      <Icon as={Ionicons} name={iconName} color={active ? "primary.600" : "coolGray.400"} />
    }
    {...buttonProps}
  >
    {children}
  </Button>
);

type Props = {
  onChange: (value: EGender) => void;
  selected?: EGender;
};
const GenderSelect = ({ onChange, selected }: Props) => {
  const [gender, setGender] = useState(selected);

  return (
    <Column shadow={8}>
      <FormControl.Label _text={{ color: "primary.600" }}>Giới tính</FormControl.Label>
      <Row bg="coolGray.600" rounded="full">
        <GenderButton
          iconName="male"
          active={gender === EGender.Male}
          onPress={() => {
            setGender(EGender.Male);
            onChange(EGender.Male);
          }}
        >
          Nam
        </GenderButton>
        <GenderButton
          iconName="female"
          active={gender === EGender.Female}
          onPress={() => {
            setGender(EGender.Female);
            onChange(EGender.Female);
          }}
        >
          Nữ
        </GenderButton>
      </Row>
    </Column>
  );
};

export default GenderSelect;

const styles = StyleSheet.create({});
