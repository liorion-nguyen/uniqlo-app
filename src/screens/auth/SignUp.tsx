import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Alert, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from 'react-native-ui-datepicker';
import { register } from '../../redux/slices/authentication';
import PhoneInput from 'react-native-phone-number-input';
import dayjs from 'dayjs';
import { AuthStackParams } from '../../navigations/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthBg from '../../components/AuthBg';
import FormButton from '../../components/Form/FormButton';
import { Center, Button, Text, FormControl, Checkbox } from 'native-base';
import FormInput from '../../components/Form/FormInput';
import FormSelectAddress from '../../components/Form/FormSelectAddress';
import { RegisterRequestType } from '../../types/redux/authentication';
import { useAppDispatch } from '../../redux/store';

// Form validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255, 'Email must be at most 255 characters')
    .required('Email is required'),
  fullName: Yup.string()
    .max(255, 'Full name must be at most 255 characters')
    .required('Full name is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  policy: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  phone: Yup.object({
    number: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country code is required'),
  }),
  address: Yup.object({
    province: Yup.string().required('Province is required'),
    district: Yup.string().required('District is required'),
    ward: Yup.string().required('Ward is required'),
  }),
});

interface Location {
  id: string;
  name: string;
}
type Props = {} & NativeStackScreenProps<AuthStackParams, "SignUp">;

const SignUp = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const phoneInput = useRef<PhoneInput>(null);

  const handlePhoneChange = (formattedValue: string) => {
    const countryCode = phoneInput.current?.getCountryCode(); 
    formik.setFieldValue('phone.number', formattedValue);
    formik.setFieldValue('phone.country', countryCode);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      policy: false,
      dateOfBirth: null,
      phone: {
        number: '',
        country: 'VN',
      },
      address: {
        province: '',
        district: '',
        ward: '',
      },
    },
    validationSchema,
    onSubmit: async (values) => {
    },
  });

  const handleSubmit = async () => {
    try {
      // validate form
      if (!formik.values.fullName) {
        Alert.alert('Error', 'Họ và tên không được để trống');
        return;
      }
      if (!formik.values.email) {
        Alert.alert('Error', 'Email không được để trống');
        return;
      }
      if (!formik.values.password) {
        Alert.alert('Error', 'Mật khẩu không được để trống');
        return;
      }
      if (!formik.values.confirmPassword) {
        Alert.alert('Error', 'Mật khẩu không được để trống');
        return;
      }
      if (!formik.values.policy) {
        Alert.alert('Error', 'Bạn phải đồng ý với các điều khoản và điều kiện');
        return;
      }
      if (!formik.values.dateOfBirth) {
        Alert.alert('Error', 'Ngày sinh không được để trống');
        return;
      }
      if (!formik.values.phone.number) {
        Alert.alert('Error', 'Số điện thoại không được để trống');
        return;
      }
      if (!formik.values.address.province) {
        Alert.alert('Error', 'Địa chỉ không được để trống');
        return;
      }
      // register
      await dispatch(register(formik.values as RegisterRequestType, navigation));
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => response.json())
      .then((data) => setProvinces(data.data));
  }, []);

  useEffect(() => {
    if (formik.values.address.province) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${formik.values.address.province}.htm`)
        .then((response) => response.json())
        .then((data) => setDistricts(data.data));
    }
  }, [formik.values.address.province]);

  useEffect(() => {
    if (formik.values.address.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${formik.values.address.district}.htm`)
        .then((response) => response.json())
        .then((data) => setWards(data.data));
    }
  }, [formik.values.address.district]);

  return (
    <AuthBg>
      <ScrollView contentContainerStyle={styles.container}>
        <FormControl>
          <FormInput
            placeholder="Họ và tên"
            onChangeText={formik.handleChange('fullName')}
            onBlur={formik.handleBlur('fullName')}
            value={formik.values.fullName}
          />
        </FormControl>
        {formik.touched.fullName && formik.errors.fullName && (
          <Text style={styles.errorText}>{formik.errors.fullName}</Text>
        )}

        <FormControl>
          <FormInput
            placeholder="Email Address"
            keyboardType="email-address"
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
          />
        </FormControl>
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}

        <FormControl>
          <FormInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
          />
        </FormControl>
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}

        <FormControl>
          <FormInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
          />
        </FormControl>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        )}

        <FormControl>
          <FormInput
            placeholder="Ngày sinh"
            value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth).format('DD/MM/YYYY') : ''}
            onFocus={() => setOpenDatePicker(true)}
            onChangeText={(value: any) => formik.setFieldValue('dateOfBirth', value)}
          />
          <Modal
            transparent={true}
            visible={openDatePicker}
            animationType="slide"
          >
            <TouchableWithoutFeedback onPress={() => setOpenDatePicker(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <DateTimePicker
                mode="single"
                date={formik.values.dateOfBirth}
                onChange={(params: any) => {
                  formik.setFieldValue('dateOfBirth', params.date);
                  setOpenDatePicker(false);
                }}
              />
            </View>
          </Modal>
        </FormControl>
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <Text style={styles.errorText}>{formik.errors.dateOfBirth}</Text>
        )}

        <FormControl style={{ gap: 10 }}>
          <FormSelectAddress items={provinces} label="Tỉnh/Thành phố" placeholder="Chọn tỉnh/thành phố" onValueChange={(value: string) => formik.setFieldValue('address.province', value)} />
          <FormSelectAddress items={districts} label="Quận/Huyện" placeholder="Chọn quận/huyện" onValueChange={(value) => formik.setFieldValue('address.district', value)} />
          <FormSelectAddress items={wards} label="Phường/Xã" placeholder="Chọn phường/xã" onValueChange={(value) => formik.setFieldValue('address.ward', value)} />
          {formik.touched.address?.ward && formik.errors.address?.ward && (
            <Text style={styles.errorText}>{formik.errors.address.ward}</Text>
          )}
        </FormControl>

        <FormControl>
          <PhoneInput
            ref={phoneInput}
            defaultCode="VN"
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneTextContainer}
            // onChangeFormattedText={handlePhoneChange}
            onChangeText={handlePhoneChange}
          />


        </FormControl>
        {formik.touched.phone && formik.errors.phone && (
          <Text style={styles.errorText}>{formik.errors.phone.number}</Text>
        )}

        <FormControl flexDirection="row" alignItems="center">
        <Checkbox
        isChecked={formik.values.policy}
            onChange={() => formik.setFieldValue('policy', !formik.values.policy)}
            value="policy"
          >
            I agree to the policy
          </Checkbox>
        </FormControl>
        {formik.touched.policy && formik.errors.policy && (
          <Text style={styles.errorText}>{formik.errors.policy}</Text>
        )}

        <FormButton onPress={async () => {
          handleSubmit();
        }} mt="5">
          Đăng ký
        </FormButton>
        <Center flexDirection="row" w="100%" mb="8" safeAreaBottom>
          <Text color="primary.600">Bạn đã có tài khoản?</Text>
          <Button variant="link" _text={{ color: "black" }} onPress={() => navigation.goBack()}>
            Đăng nhập
          </Button>
        </Center>
      </ScrollView>
    </AuthBg>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  datePickerContainer: {
    marginVertical: 12,
  },
  phoneContainer: {
    marginVertical: 12,
  },
  phoneTextContainer: {
    paddingVertical: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default SignUp;
