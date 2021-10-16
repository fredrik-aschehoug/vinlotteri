import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { OnChangeValue } from 'react-select';
import { useField } from 'formik';

interface Option {
  label: string;
  value: string;
}

interface Props {
    name: string;
    options: Option[];
    onCreate: (inputValue: string) => Promise<void>;
}
export const DropdownCreatable = ({ name, options, onCreate }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [, meta, helpers] = useField(name);
    
    const { value } = meta;
    const { setValue } = helpers;
    
    const handleChange = (newValue: OnChangeValue<Option, false>) => {
        setValue(newValue);
    };

    const handleCreate = async (inputValue: string) => {
        setIsLoading(true);
        await onCreate(inputValue);
        setIsLoading(false);
    };
    return (
        <CreatableSelect
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={handleChange}
          onCreateOption={handleCreate}
          options={options}
          value={value}
        />
      );
};
