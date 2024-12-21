import { Box, Center, CheckIcon, Select } from "native-base";

type Props = {
  items: any[];
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
};

export default function FormSelectAddress({ items, label, placeholder, onValueChange }: Props) {
  return (
    <Center>
    <Box w="100%" rounded="full" shadow="8" bg="primary.200" borderColor="primary.200">
        <Select 
          minWidth="200" 
          accessibilityLabel={label} 
          placeholder={placeholder} 
          _selectedItem={{
            endIcon: <CheckIcon size="5" />
          }} 
          borderWidth={0}
          color="white"
          onValueChange={(itemValue: any) => onValueChange(itemValue)}
        >
          {items.map((item) => (
            <Select.Item  key={item.id} label={item.full_name} value={item.id} />
          ))}
        </Select>
      </Box>
    </Center>
  );
}
