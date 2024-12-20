declare module 'react-native-phone-number-input' {
    import { Component } from 'react';
    import { TextInputProps } from 'react-native';

    interface PhoneNumberInputProps extends TextInputProps {
        defaultCode?: string;
        containerStyle?: StyleProp<ViewStyle>;
        textContainerStyle?: StyleProp<ViewStyle>;
        onChangeFormattedText?: (text: string) => void;
        onChangeText?: (text: string) => void;
    }

    export default class PhoneNumberInput extends Component<PhoneNumberInputProps> { }
}
